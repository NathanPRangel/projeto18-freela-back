import joi from 'joi'

export const postSchema = joi.object({
    name_dog: joi.string().required(),
    image: joi.string().uri().required(),
    description: joi.string().required(),

})