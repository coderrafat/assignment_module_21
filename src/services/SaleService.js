const SaleModel = require("../models/SaleModel");

//!Total Revenue Service
exports.TotalRevenue = async (req) => {
    try {
        const result = await SaleModel.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: { $multiply: ['$quantity', '$price'] } },
                },
            },
        ]);

        if (result.length === 0) {
            // No sales data found
            return { totalRevenue: 0 };
        }

        return { totalRevenue: result[0].totalRevenue };
    } catch (error) {
        console.log(error)
        return { status: 'fail', massage: 'Something went wrong' }
    }
};

//!Quantity By Product Service
exports.QuantityByProduct = async () => {
    try {
        const result = await SaleModel.aggregate([
            {
                $group: {
                    _id: '$product',
                    totalQuantity: { $sum: '$quantity' },
                },
            },
        ]);

        return { data: result };

    } catch (error) {
        console.log(error)
        return { status: 'fail', massage: 'Something went wrong' };
    }
};

//!TopProduct Service
exports.TopProduct = async () => {
    try {
        const result = await SaleModel.aggregate([
            {
                $group: {
                    _id: '$product',
                    totalRevenue: { $sum: { $multiply: ['$quantity', '$price'] } },
                },
            },
            {
                $sort: { totalRevenue: -1 }, // Sort in descending order
            },
            {
                $limit: 5, // Limit the result to the top 5 products
            },
        ]);


        return { data: result };
    } catch (error) {
        console.log(error)
        return { status: 'fail', massage: 'Something went wrong' }
    }
};

//!Average Price Service
exports.AveragePrice = async () => {
    try {

        //!average price of products sold
        const result = await SaleModel.aggregate([
            {
                $group: {
                    _id: null,
                    totalQuantity: { $sum: '$quantity' },
                    totalRevenue: { $sum: { $multiply: ['$quantity', '$price'] } },
                },
            },
            {
                $project: {
                    _id: 0, // Exclude _id field
                    averagePrice: { $divide: ['$totalRevenue', '$totalQuantity'] },
                },
            },
        ]);

        if (result.length === 0) {
            // No sales data found
            return { averagePrice: 0 };
        }

        return { data: result[0] };

    } catch (error) {
        console.log(error)
        return { status: 'fail', massage: 'Something went wrong' }
    }
};

//!Revenue By Month And Year
exports.RevenueByMonthAndYear = async () => {
    try {
        const result = await SaleModel.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: '$date' },
                        month: { $month: '$date' },
                    },
                    totalRevenue: { $sum: { $multiply: ['$quantity', '$price'] } },
                },
            },
            {
                $project: {
                    _id: 0, // Exclude _id field
                    year: '$_id.year',
                    month: '$_id.month',
                    totalRevenue: 1,
                },
            },
            {
                $sort: { year: 1, month: 1 }, // Sort by year and month
            },
        ]);

        return { data: result }
    } catch (error) {
        console.log(error)
        return { status: 'fail', error: 'Something Went Wrong' }
    }
};

//!Highest Quantity Sold
exports.HighestQuantitySold = async () => {
    try {
        const result = await SaleModel.aggregate([
            {
                $group: {
                    _id: '$date',
                    highestQuantityProduct: { $max: { $multiply: ['$quantity', '$price'] } },
                },
            },
            {
                $sort: { highestQuantityProduct: -1 }, // Sort in descending order
            },
            {
                $limit: 1, // Limit to the highest quantity sold on a single day
            },
            {
                $lookup: {
                    from: 'sales',
                    localField: '_id',
                    foreignField: 'date',
                    as: 'salesData',
                },
            },
            {
                $unwind: '$salesData',
            },
            {
                $project: {
                    _id: 0,
                    date: '$_id',
                    product: '$salesData.product',
                    quantity: '$salesData.quantity',
                },
            },
        ]);


        return { data: result[0] };

    } catch (error) {
        console.log(error)
        return { status: 'fail', error: 'Something Went Wrong' }
    }
};

//!Department Salary Expense
exports.DepartmentSalaryExpense = async () => {
    try {
        const result = await SaleModel.aggregate([
            {
                $group: {
                    _id: '$department', // Assuming department information is present in the sales documents
                    totalSalaryExpense: { $sum: '$salary' }, // Replace 'salary' with the actual field name
                },
            },
        ]);


        return { data: result };
    } catch (error) {
        console.log(error)
        return { status: 'fail', error: 'Something Went Wrong' }
    }
};
