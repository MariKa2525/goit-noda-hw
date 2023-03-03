const functions = require('./contacts')
const argv = require('yargs').argv

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contactList = await functions.listContacts()
      console.table(contactList)
      break
    case 'get':
      const contact = await functions.getContactById(id)
      console.table(contact)
      break

    case 'add':
      const newContact = await functions.addContact(name, email, phone)
      console.table(newContact)
      break

    case 'remove':
      const removeContact = await functions.removeContact(id)
      console.table(removeContact)
      break

    default:
      console.warn('\x1B[31m Unknown action type!')
  }
}

invokeAction(argv)
