import Joi from 'joi';
import { CartItem, FormType, genderValues } from '../../../src/features/register/models';

const baseOrderTypeSchema = Joi.object({
  coupon: Joi.object({
    id: Joi.string().max(50).required().messages({
      'string.base': 'Kupong-ID måste vara en text.',
      'string.max': 'Kupong-ID får inte vara längre än 50 tecken.',
      'any.required': 'Kupong-ID är obligatoriskt.',
    }),
    percent_off: Joi.number().optional().min(0).max(100).messages({
      'number.base': 'Rabattprocenten måste vara ett nummer.',
      'number.min': 'Rabattprocenten måste vara minst 0.',
      'number.max': 'Rabattprocenten får inte överstiga 100.',
    }),
    name: Joi.string().max(100).optional().messages({
      'string.base': 'Kupongnamnet måste vara en text.',
      'string.max': 'Kupongnamnet får inte vara längre än 100 tecken.',
    }),
  }).optional().unknown(true).messages({
    'object.base': 'Kupongen måste vara ett giltigt objekt.',
  }),

  extraDonation: Joi.number().min(0).required().messages({
    'number.base': 'Extra donation måste vara ett nummer.',
    'number.min': 'Extra donation kan inte vara mindre än 0.',
    'any.required': 'Extra donation är obligatorisk.'
  }),

  name1: Joi.string().min(1).max(40).required().messages({
    'string.empty': 'Namn krävs.',
    'string.min': 'Namn ska ha minst 1 tecken.',
    'string.max': 'Namn får inte vara längre än 40 tecken.',
    'any.required': 'Namn är obligatoriskt.'
  }),

  email1: Joi.string().email().required().messages({
    'string.empty': 'Email krävs.',
    'string.email': 'Email måste vara en giltig e-postadress.',
    'any.required': 'Email är obligatoriskt.'
  }),

  info: Joi.string().allow('', null).max(200).optional().messages({
    'string.empty': 'Info är valfritt och kan lämnas tomt.',
    'string.max': 'Info får inte vara längre än 200 tecken.'
  }),
});

const soloSchema = baseOrderTypeSchema.keys({
  year1: Joi.string().regex(/^\d{4}$/).required().messages({
    'string.empty': 'Födelseår krävs.',
    'string.pattern.base': 'Födelseår måste vara ett giltigt 4-siffrigt år.',
    'any.required': 'Födelseår är obligatoriskt.'
  }),

  month1: Joi.string().regex(/^([1-9]|1[0-2])$/).required().messages({
    'string.empty': 'Födelsemånad krävs.',
    'string.pattern.base': 'Födelsemånad måste vara en giltig månad (01-12).',
    'any.required': 'Födelsemånad är obligatoriskt.'
  }),

  day1: Joi.string().regex(/^([1-9]|[12]\d|3[01])$/).required().messages({
    'string.empty': 'Födelsedag krävs.',
    'string.pattern.base': 'Födelsedag måste vara en giltig dag (01-31).',
    'any.required': 'Födelsedag är obligatorisk.'
  }),

  gender: Joi.string().valid(...genderValues).required().messages({
    'string.empty': 'Kön krävs.',
    'any.only': `Ogiltig kön. Tillåtna värden är: ${genderValues.join(", ")}.`,
    'any.required': 'Kön är obligatoriskt.'
  }),

  city1: Joi.string().allow('').max(50).optional().messages({
    'string.max': 'Ort får inte vara längre än 50 tecken.'
  }),
});

const kidsSchema = baseOrderTypeSchema.keys({
  year1: Joi.number().integer().min(0).max(99).required().messages({
    'string.empty': 'Ålder krävs.',
    'string.pattern.base': 'Ålder måste vara ett giltigt år.',
    'any.required': 'Ålder är obligatoriskt.'
  }),
});

const teamSchema = baseOrderTypeSchema.keys({
  teamName: Joi.string().min(1).max(40).required().messages({
    'string.empty': 'Lagnamn krävs.',
    'string.min': 'Lagnamn ska ha minst 1 tecken.',
    'string.max': 'Lagnamn får inte vara längre än 40 tecken.',
    'any.required': 'Lagnamn är obligatoriskt.'
  }),

  year1: Joi.string().regex(/^\d{4}$/).required().messages({
    'string.empty': 'Födelseår 1 krävs.',
    'string.pattern.base': 'Födelseår 1 måste vara ett giltigt 4-siffrigt år.',
    'any.required': 'Födelseår 1 är obligatoriskt.'
  }),

  month1: Joi.string().regex(/^([1-9]|1[0-2])$/).required().messages({
    'string.empty': 'Födelsemånad 1 krävs.',
    'string.pattern.base': 'Födelsemånad 1 måste vara en giltig månad (01-12).',
    'any.required': 'Födelsemånad 1 är obligatoriskt.'
  }),

  day1: Joi.string().regex(/^([1-9]|[12]\d|3[01])$/).required().messages({
    'string.empty': 'Födelsedag 1 krävs.',
    'string.pattern.base': 'Födelsedag 1 måste vara en giltig dag (01-31).',
    'any.required': 'Födelsedag 1 är obligatorisk.'
  }),

  city1: Joi.string().allow('').max(50).optional().messages({
    'string.max': 'Ort 1 får inte vara längre än 50 tecken.'
  }),

  name2: Joi.string().min(1).max(40).required().messages({
    'string.empty': 'Namn 2 krävs.',
    'string.min': 'Namn 2 ska ha minst 1 tecken.',
    'string.max': 'Namn 2 får inte vara längre än 40 tecken.',
    'any.required': 'Namn 2 är obligatoriskt.'
  }),

  email2: Joi.string().email().required().messages({
    'string.empty': 'Email 2 krävs.',
    'string.email': 'Email 2 måste vara en giltig e-postadress.',
    'any.required': 'Email 2 är obligatoriskt.'
  }),

  year2: Joi.string().regex(/^\d{4}$/).required().messages({
    'string.empty': 'Födelseår 2 krävs.',
    'string.pattern.base': 'Födelseår 2 måste vara ett giltigt 4-siffrigt år.',
    'any.required': 'Födelseår 2 är obligatoriskt.'
  }),

  month2: Joi.string().regex(/^([1-9]|1[0-2])$/).required().messages({
    'string.empty': 'Födelsemånad 2 krävs.',
    'string.pattern.base': 'Födelsemånad 2 måste vara en giltig månad (01-12).',
    'any.required': 'Födelsemånad 2 är obligatoriskt.'
  }),

  day2: Joi.string().regex(/^([1-9]|[12]\d|3[01])$/).required().messages({
    'string.empty': 'Födelsedag 2 krävs.',
    'string.pattern.base': 'Födelsedag 2 måste vara en giltig dag (01-31).',
    'any.required': 'Födelsedag 2 är obligatorisk.'
  }),

  city2: Joi.string().allow('').max(50).optional().messages({
    'string.max': 'Ort 2 får inte vara längre än 50 tecken.'
  }),

  // Optional fields for name3, email3, year3, month3, day3, city3
  name3: Joi.string().allow('').max(40).optional().messages({
    'string.max': 'Namn 3 får inte vara längre än 40 tecken.'
  }),

  email3: Joi.string().email().allow('').optional().messages({
    'string.email': 'Email 3 måste vara en giltig e-postadress.'
  }),

  year3: Joi.string().regex(/^\d{4}$/).allow('').optional().messages({
    'string.pattern.base': 'Födelseår 3 måste vara ett giltigt 4-siffrigt år.'
  }),

  month3: Joi.string().regex(/^([1-9]|1[0-2])$/).allow('').optional().messages({
    'string.pattern.base': 'Födelsemånad 3 måste vara en giltig månad (01-12).'
  }),

  day3: Joi.string().regex(/^([1-9]|[12]\d|3[01])$/).allow('').optional().messages({
    'string.pattern.base': 'Födelsedag 3 måste vara en giltig dag (01-31).'
  }),

  city3: Joi.string().allow('').max(50).optional().messages({
    'string.max': 'Ort 3 får inte vara längre än 50 tecken.'
  }),
});

export function validateFormData(formData: any, formType: FormType) {
  let schema;

  if (formType === FormType.Solo) {
    schema = soloSchema;
  } else if (formType === FormType.Team) {
    schema = teamSchema;
  } else if (formType === FormType.MerchOrder) {
    schema = baseOrderTypeSchema;
  } else if (formType === FormType.Kids) {
    schema = kidsSchema;
  } else {
    throw new Error('Ogiltig formulärtyp');
  }

  return schema.validate(formData, { abortEarly: false });
}

export function validateFormCart(cart: CartItem[]) {
  const schema = Joi.array().items(
    Joi.object({
      id: Joi.string().required().messages({
        'string.base': 'Produkt-ID måste vara en text.',
        'any.required': 'Produkt-ID är obligatoriskt.'
      }),
      quantity: Joi.number().min(1).max(20).required().messages({
        'number.base': 'Antal måste vara ett nummer.',
        'number.min': 'Antal måste vara minst 1.',
        'number.max': 'Antal måste vara max 20.',
        'any.required': 'Antal är obligatoriskt.'
      }),
      default_price: Joi.object({
        id: Joi.string().required().messages({
          'string.base': 'Pris-ID måste vara en text.',
          'any.required': 'Pris-ID är obligatoriskt.'
        }),
        unit_amount: Joi.number().min(0).required().messages({
          'number.base': 'Pris måste vara ett nummer.',
          'number.min': 'Pris kan inte vara negativt.',
          'any.required': 'Pris är obligatoriskt.'
        }),
        currency: Joi.string().valid("sek").required().messages({
          'string.base': 'Valuta måste vara en text.',
          'any.required': 'Valuta är obligatoriskt.',
          'any.only': 'Endast sek är tillåtet'
        })
      }).required().unknown(true).messages({
        'object.base': 'Produktens pris måste vara giltigt.',
        'any.required': 'Produkten måste ha ett pris.'
      })
    }).unknown(true)
  );

  return schema.validate(cart, { abortEarly: false });
}
