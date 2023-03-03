const fs = require('node:fs/promises')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const contactsPath = path.join(__dirname, './db/contacts.json')

// TODO: задокументувати кожну функцію

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath)
    const result = JSON.parse(data)
    return result
  } catch (error) {
    console.log(error)
  }
}

async function getContactById(contactId) {
  try {
    const result = await listContacts()
    const resultId = result.find((contact) => +contact.id === contactId)
    return resultId || null
  } catch (error) {
    console.log(error)
  }
}

async function removeContact(contactId) {
  try {
    const list = await listContacts()
    result = list.filter((contact) => contact.id != contactId)
    return result
  } catch (error) {
    console.log(error)
  }
}

async function addContact(name, email, phone) {
  try {
    const result = await listContacts()
    const contactsNew = {
      id: uuidv4(),
      name,
      email,
      phone,
    }
    result.push(contactsNew)
    await fs.writeFile(contactsPath, JSON.stringify(result, null, '\t'))
    return contactsNew
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
}
