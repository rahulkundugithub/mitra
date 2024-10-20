export const getBase64 = async (file) => new Promise((resolve, reject)=>{
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        console.log(reader);
        
        resolve(reader.result)};
        reader.onerror = (error) => {
            alert('Error in reading the file!!');
            reject(error);
        };
});