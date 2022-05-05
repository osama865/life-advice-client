
import Dexie from "dexie";


var db = new Dexie('mydb');
db.version(1).stores({ advises: 'id' });

// localStorage.setItem('count', parseInt(0))
unique.id = parseInt(localStorage.getItem('count'))
function unique() {
    localStorage.setItem('count', unique.id)
    return unique.id++
}

let doc = {
    name: 'osama',
    age: 20
}

const insert = (doc) => {
    // delete(doc._id)
    db.advises.put({ id: unique(), ...doc }).then(id => {
        console.log(id);
    })
}

insert(doc)
insert(doc)
insert(doc)
insert(doc)


const findOne = (selector) => {
    return db.advises.get(selector)
}

const find = async () => {
    try {
        let res = await db.advises.toArray()
        console.log(res, 'hoooo');
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

