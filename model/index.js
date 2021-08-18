const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require('nanoid')

 const contactsPath =path.join(__dirname, "contacts.json") ;

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);

    return contacts.map(({ name, email, phone }) =>
      console.log(`name: ${name}, email: ${email}, phone: ${phone}`)
    );
  } catch (error) {
    console.log(error);
  }
}

const getContactById = async (contactId) => {
try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const showContact = await contacts.find(
      (contact) => String(contact.id) === String(contactId)
    );
  return showContact;
  
  } catch (error) {
    console.log(error);
  }
}

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const updatedList = contacts.filter(({ id }) => String(id) !== String(contactId));

      
     fs.writeFile(
      contactsPath,
      JSON.stringify(updatedList, null, 2),
      "utf-8"
    );
    console.log("Contact has been removed");
  } catch (error) {
    console.log(error);
  }
}

const addContact = async (body) => {

try {
    const newContact = {
      id: nanoid(5),
      ...body,
    };
   
  const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const updatedList = [newContact, ...contacts];
   await fs.writeFile(contactsPath, JSON.stringify(updatedList, null, 2), "utf-8");
  console.log(`Contact has been added`);
  return newContact;
  } catch (error) {
    console.log(error);
  }

}

const updateContact = async (contactId, body) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const updatedContact = await contacts.find(
      (contact) => {
       if (String(contact.id) === String(contactId)) {
        contact.name = body.name ?? contact.name;
        contact.email = body.email ?? contact.email;
        contact.phone = body.phone ?? contact.phone;
        return contact;
      }
    });
    return updatedContact;
    const updatedList = [...contacts];
   
    await fs.writeFile(contactsPath, JSON.stringify(updatedList, null, 2), "utf-8");
    return contactId ? updatedContact : null;


  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
 

