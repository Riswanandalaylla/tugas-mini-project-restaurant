const db = require("../../db/config")

const orderModel = {}

orderModel.getAll = (callback) => {
    db.all('SELECT * FROM orders JOIN menu ON menu.id = orders.menu_id JOIN customer ON customer.id = orders.customer_id',(err,rows) => {
        if(err){
            callback(err,null)
        }else {
            callback(null,rows)
        }
    });
}
orderModel.create = (data,callback) => {
    db.run(`INSERT INTO orders (customer_id,menu_id,qty) VALUES ('${data.customerId}','${data.menuId}','${data.qty}')`,(err,rows) => {
        if(err){
            callback(err,null)
        }else {
            callback(null,rows)
        }
    })
}

module.exports = orderModel