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

      
      await fs.writeFile(
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

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
 


// async function listContacts() {
  
// }

// async function getContactById(contactId) {
  
// }

// async function removeContact(contactId) {
//   try {
//     const data = await fs.readFile(contactsPath, "utf-8");
//     const contacts = JSON.parse(data);
//     const updatedList = contacts.filter(({ id }) => String(id) !== String(contactId));

      
//       await fs.writeFile(
//       contactsPath,
//       JSON.stringify(updatedList, null, 2),
//       "utf-8"
//     );
//     console.log("Contact has been removed");
//   } catch (error) {
//     console.log(error);
//   }
// }

// async function addContact(name, email, phone) {
//   try {
//     const newContact = {
//       id: nanoid(5),
//       name,
//       email,
//       phone,
//     };
//     const data = await fs.readFile(contactsPath, "utf-8");
//     const contacts = JSON.parse(data);
//     const updatedList = [newContact, ...contacts];
//     fs.writeFile(contactsPath, JSON.stringify(updatedList, null, 2), "utf-8");
//     console.log(`Contact has been added`);
//   } catch (error) {
//     console.log(error);
//   }
// }
// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
// };