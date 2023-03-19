const PostData = async (url, data) => {          //Пример запроса вынесен в отдельную переменную
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'   
        },
        body: data

    });

    return await res.json();
};


export {PostData};