const customerModel = require("../models/customerModel");

const customerController = {}
customerController.getAll = (req,res) => {
    const menus = customerModel.getAll((err,rows) => {
        if(err){
            throw err
        }else {
            res.json({
                data : rows
            })
        }
    });
    
}
customerController.getById = (req,res) => {
    const {id} = req.params
    const customer = customerModel.findById(id,(err,rows) => {
        if(err){
            throw err
        }else {
            res.json({
                data : rows
            })
        }
    })
    
}
customerController.create = (req,res) => {
    try {
        const createCustomer = customerModel.create(req.body)
        return res.json({
            message : "Data berhasil ditambahkan !"
        })
    } catch (error) {
        return res.json({
            message : error.message
        })
    }
   
}
customerController.update = (req,res) => {
    try {
        const updateCustomer = customerModel.update(req.params.id,req.body,(err,rows) => {
            if(err){
                throw err
            }else {
                return res.json({
                    message : "Data berhasil diupdate !"
                })
            }
        })
        
    } catch (error) {
        return res.json({
            message : error.message
        })
    }
}
customerController.delete = (req,res) => {
    try {
        const deleteCustomer = customerModel.delete(req.params.id,(err,rows) => {
            if(err){
                throw err
            }else {
                return res.json({
                    message : "Data berhasil dihapus!"
                })
            }
        })
        
    } catch (error) {
        return res.json({
            message : error.message
        })
    }
}
module.exports = customerController