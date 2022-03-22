import { request } from "../utils";
import {Layout,Loading} from './';
import {useState} from 'react';

const UploadFile = () => {
    const [files,setFiles] = useState(null);
    const [loading,setLoading] = useState(false);

    const url = 'http://localhost:8000/api/upload';

    const handleChange = (e) => {
       setFiles(e.currentTarget.files[0]);
    }
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        console.log(files);
        const formData = new FormData();
        formData.append('file',files,files.name);
        console.log(JSON.stringify(formData));
        const {success,response} = await request(url,'post',formData);
        console.log(response);
        setLoading(false);
    }

    if(loading){
        return (
            <Layout>
                <Loading />
            </Layout>
        );
    }
    return (
        <Layout>
            <main className="main-content">
                <form className="form" onSubmit={handleSubmit}>
                    <h3 className="center">uploadfile</h3> 
                    <input type="file" onChange={handleChange} />   
                    <button className="btn btn--center" type="submit">
                        upload
                    </button>
                </form>    
            </main>
        </Layout>
    );
}

export default UploadFile;