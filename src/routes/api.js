const { TotalRevenue, QuantityByProduct, TopProduct, AveragePrice, RevenueByMonthAndYear, HighestQuantitySold, DepartmentSalaryExpense } = require('../controllers/SaleController');

const router = require('express').Router();


router.get('/total-revenue', TotalRevenue);

router.get('/quantity-by-product', QuantityByProduct)

router.get('/top-product', TopProduct);

router.get('/average-price', AveragePrice);

router.get('/revenue-by-month-and-year', RevenueByMonthAndYear);

router.get('/highest-quantity-sold', HighestQuantitySold);

router.get('/department-salary-expense', DepartmentSalaryExpense);

module.exports = router;