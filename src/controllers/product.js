import Product from "../models/product";

import Joi from "joi";

const productSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required()
});

export const create = async (Request, response) => {
    try {
        const { error } = productSchema.validate(Request.body);
        if (error) {
            response.json({
                message: error.details[0].message
            });
        }
        const products = await Product.create(Request.body);
        return response.status(201).json({
            message: "tạo sản phẩm thành công",
            products,
        })
    } catch (error) {
        return response.status(400).json({
            message: error,
        });
    }
}

export const getAll = async (Request, response) => {
    try {
        const products = await Product.find();
        return response.status(201).json(products);
    } catch (error) {
        return response.status(400).json({
            message: error,
        });
    }
}

export const get = async (Request, response) => {
    try {
        const products = await Product.findById(Request.params.id);
        return response.status(201).json(products);
    } catch (error) {
        return response.status(400).json({
            message: error,
        });
    }
}

export const update = async (Request, response) => {
    try {
        const products = await Product.findOneAndUpdate({ _id: Request.params.id }, Request.body, { new: true });
        return response.json({
            message: "cập nhật thành công",
            products
        })
    } catch (error) {
        return response.status(400).json({
            message: error,
        });
    }
}

export const remove = async (Request, response) => {
    try {
        const products = await Product.findOneAndDelete({ _id: Request.params.id });
        return response.json({
            message: "xóa thành công",
            products,
        })
    } catch (error) {
        return response.status(400).json({
            message: error,
        });
    }
}