const express = require('express')
const router = express.Router()
const Contact = require('../../model');


router.get('/', async (_req, res, next) => {
  try {
    const contacts = await Contact.listContacts();
    return res.json({ status: 'success', code: 200, data: { contacts }  });
  } catch (error) {
    next();
  }
  
  
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await Contact.getContactById(req.params.contactId);
    if (!contact) {
      return res.status(400).json({ message: 'Not found' });
    }
    return res.status(201).json({ status: 'success', code: 201, data: { contact }  })
  } catch (error) {
    next(error);
  }
  

})

router.post('/', async (req, res, next) => {
  try {
    const contact = await Contact.addContact(req.body);
    if (!contact) {
      return res.status(400).json({ message: 'missing required name field' });
    }
    return res.status(201).json({ status: 'success', code: 201, data: { contact }  })
  } catch (error) {
    next(error);
  }
  
})

router.delete('/:contactId', async (req, res, next) => {
 try {
    const contact = await Contact.removeContact(req.params.contactId);
    // if (!contact) {
    //   return res.status(404).json({ message: 'Not foundввввв' });
    // }
    return res.status(200).json({status: 'success', code: 201, message: 'contact deleted' });
  } catch (error) {
    next(error);
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const contact = await Contact.updateContact(req.params.contactId, req.body);
    if (contact) {
       return res.status(200).json({status: 'success', code: 201, message: 'contact updated' });
      
    }
   return res.status(404).json({ message: 'Not foundввввв' });
  } catch (error) {
    next(error);
  }
})

module.exports = router
