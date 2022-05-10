
import Dexie from "dexie";

export const db = new Dexie('mydb');
db.version(1).stores({ advises: '_id' });

// localStorage.setItem('count', parseInt(0))
unique.id = parseInt(localStorage.getItem('count'))

function unique() {
    localStorage.setItem('count', unique.id)
    return unique.id++
}

const insert = (doc) => {
    // delete(doc._id)
    return db.advises.put({ id: unique(), ...doc }).then(id => {
    })
}

const findOne = async (selector) => {
    try {
        return await db.advises.get(selector)
    } catch (error) {
        console.error(error);
    }

}


const find = async () => {
    try {
        let res = await db.advises.toArray()
        return res
    } catch {

    }
}


const update = (id, newValu) => {
    db.advises.update(id, newValu)
}

const remove = (selector) => {
    db.advises.delete(selector)
}


const useIndexDB = () => {
    return { insert, remove, find, findOne, update }
}
export { useIndexDB }

