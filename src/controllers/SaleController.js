const { TotalRevenue, QuantityByProduct, TopProduct, AveragePrice, RevenueByMonthAndYear, HighestQuantitySold, DepartmentSalaryExpense } = require("../services/SaleService")


exports.TotalRevenue = async (req, res) => {
    const result = await TotalRevenue();

    res.status(200).json(result);
};

exports.QuantityByProduct = async (req, res) => {
    const result = await QuantityByProduct();
    res.status(200).json(result);
};

exports.TopProduct = async (req, res) => {
    const result = await TopProduct();
    res.status(200).json(result);
};


exports.AveragePrice = async (req, res) => {
    const result = await AveragePrice();
    res.status(200).json(result);
};

exports.RevenueByMonthAndYear = async (req, res) => {
    const result = await RevenueByMonthAndYear();

    res.status(200).json(result);
}

exports.HighestQuantitySold = async (req, res) => {
    const result = await HighestQuantitySold();
    res.status(200).json(result);
}

exports.DepartmentSalaryExpense = async (req, res) => {
    const result = await DepartmentSalaryExpense();

    res.status(200).json(result);
}
