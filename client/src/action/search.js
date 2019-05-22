import actionType from './actionType';

export function change(operate) {
    return {
        type: actionType.DATA_CHANGE,
        operate
    }
}

export function tableUpdate(data, page) {
    let table = {
        data: [],
        currentPage: page,
        total: data.total / 10,
    };
    console.log(data);
    if (data.data.length > 0) {
        for (let element of data.data) {
            table.data.push({
                id: element.id,
                isbn: element.isbn,
                title: element.title,
                author: element.author,
                year: element.year
            })
        }
    }
    console.log(table);
    return {
        type: actionType.TABLE_UPDATE,
        table
    }
}
