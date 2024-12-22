import Joi from 'joi';
import { FormType, genderValues, shirtMaterials, shirtTypes, sizeValues } from '../../../src/features/register/models';

const baseOrderTypeSchema = Joi.object({
  shirts: Joi.array()
    .items(
      Joi.object({
        size: Joi.string().valid(...sizeValues).required(),
        type: Joi.string().valid(...shirtTypes).required(),
        material:  Joi.string().valid(...shirtMaterials).required(),
      }).options({ allowUnknown: false }) // Disallow additional fields
    )
    .required(),
  numCaps: Joi.number().min(0).required(),
  extraDonation: Joi.number().min(0).required(),
  name1: Joi.string().min(1).max(40).required(),
  email1: Joi.string().email().required(),
  info: Joi.string().allow('', null).max(200).optional(),
});

const soloSchema = baseOrderTypeSchema.keys({
  year1: Joi.string().regex(/^\d{4}$/).required(),
  month1: Joi.string().regex(/^([1-9]|1[0-2])$/).required(), // 1-12
  day1: Joi.string().regex(/^([1-9]|[12]\d|3[01])$/).required(), // 1-31
  gender: Joi.string().valid(...genderValues).required(),
  city1: Joi.string().allow('').max(50).optional(),
});

const teamSchema = baseOrderTypeSchema.keys({
  teamName: Joi.string().min(1).max(40).required(),
  year1: Joi.string().regex(/^\d{4}$/).required(),
  month1: Joi.string().regex(/^([1-9]|1[0-2])$/).required(),
  day1: Joi.string().regex(/^([1-9]|[12]\d|3[01])$/).required(),
  city1: Joi.string().allow('').max(50).optional(),
  name2: Joi.string().min(1).max(40).required(),
  email2: Joi.string().email().required(),
  year2: Joi.string().regex(/^\d{4}$/).required(),
  month2: Joi.string().regex(/^([1-9]|1[0-2])$/).required(),
  day2: Joi.string().regex(/^([1-9]|[12]\d|3[01])$/).required(),
  city2: Joi.string().allow('').max(50).optional(),
  name3: Joi.string().allow('').max(40).optional(),
  email3: Joi.string().email().allow('').optional(),
  year3: Joi.string().regex(/^\d{4}$/).allow('').optional(),
  month3: Joi.string().regex(/^([1-9]|1[0-2])$/).allow('').optional(),
  day3: Joi.string().regex(/^([1-9]|[12]\d|3[01])$/).allow('').optional(),
  city3: Joi.string().allow('').max(50).optional(),
});

export function validateFormData(formData: any, formType: FormType) {
  let schema;

  if (formType === FormType.Solo) {
    schema = soloSchema;
  } else if (formType === FormType.Team) {
    schema = teamSchema;
  } else if (formType === FormType.MerchOrder) {
    schema = baseOrderTypeSchema;
  }
  else {
    throw new Error('Invalid form type');
  }

  const { error, value } = schema.validate(formData, { abortEarly: false });

  if (error) {
    throw new Error(`Validation error: ${error.details.map(d => d.message).join(', ')}`);
  }

  return value;
}
