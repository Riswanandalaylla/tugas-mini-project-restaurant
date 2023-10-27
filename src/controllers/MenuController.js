const menuModel = require("../models/menuModel");

const menuController = {}
menuController.getAll = (req,res) => {
    const menus = menuModel.getAll((err,rows) => {
        if(err){
            throw err
        }else {
            res.json({
                data : rows
            })
        }
    });
    
}
menuController.getById = (req,res) => {
    const {id} = req.params
    const menu = menuModel.findById(id,(err,rows) => {
        if(err){
            throw err
        }else {
            res.json({
                data : rows
            })
        }
    })
    
}
menuController.create = (req,res) => {
    try {
        const createMenu = menuModel.create(req.body)
        return res.json({
            message : "Data berhasil ditambahkan !"
        })
    } catch (error) {
        return res.json({
            message : error.message
        })
    }
   
}
menuController.update = (req,res) => {
    try {
        const updateMenu = menuModel.update(req.params.id,req.body,(err,rows) => {
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
menuController.delete = (req,res) => {
    try {
        const deleteMenu = menuModel.delete(req.params.id,(err,rows) => {
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
module.exports = menuController