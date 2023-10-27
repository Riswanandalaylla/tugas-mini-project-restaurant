const customerModel = require("../models/customerModel");
const menuModel = require("../models/menuModel");
const orderModel = require("../models/orderModel");

const orderController = {};

orderController.getAll = (req, res) => {
    orderModel.getAll((err, rows) => {
        if (err) {
            res.status(500).json({
                "Status": "ERROR",
                "data": err
            });
        } else {
            res.status(200).json({
                "Status": "SUCCESS",
                "data": rows
            });
        }
    });
};

orderController.create = async (req, res) => {
    const { customerId, items } = req.body;

    try {
        const findCustomer = await customerModel.findById(customerId);

        const menuNames = items.map((item) => item.menu);
        const mappedMenu = items.map((item) => ({
            menuName: item.menu.split(" ").join(""),
            qty: item.qty
        }));

        const groupByMenuName = mappedMenu.reduce((result, item) => {
            if (!result[item.menuName]) {
                result[item.menuName] = [];
            }
            result[item.menuName].push(item);
            return result;
        }, {});

        const findMenuPromises = menuNames.map((menuName) => {
            return new Promise((resolve, reject) => {
                menuModel.findByName(menuName, (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                });
            });
        });

        const menus = await Promise.all(findMenuPromises);

        for (let data of menus) {
            const menuName = data[0].item.split(" ").join("");
            const insertOrder = {
                customerId: customerId,
                menuId: data[0].id,
                qty: groupByMenuName[menuName][0].qty
            };

            orderModel.create(insertOrder, (err, rows) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(rows);
                }
            });
        }

        res.status(201).json({
            message: "Data Berhasil Ditambahkan"
        });
    } catch (error) {
        res.status(500).json({
            "Status": "ERROR",
            "data": error
        });
    }
};

module.exports = orderController;