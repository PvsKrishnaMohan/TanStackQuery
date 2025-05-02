export const fetchPosts = async()=>{
    const result = await fetch(`http://localhost:3000/posts?_sort=-id`);
    const postsData = await result.json();
    return postsData;
}

export const tagsData = async()=>{
    const tagsResponse = await fetch('http://localhost:3000/tags');
    const tagsData = await tagsResponse.json();
    return tagsData;
}

export const addPost =async(post)=>{
    const response =await fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers:{
            'content-type': 'application/json'
        },
        body: JSON.stringify(post)
    })

    return response.json();
}