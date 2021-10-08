import React, { useContext, useState, useEffect } from 'react'
import { Redirect, useHistory } from 'react-router';
import { BsBookmarkPlus} from 'react-icons/bs';
import {Form, Button} from 'react-bootstrap';

import { UserContext } from '../../config/UserContext/UserContext';
import { API, setAuthToken } from '../../config/api/api';

import './AddBook.css'
import NavbarAdmin from '../../components/NavbarAdmin/NavbarAdmin'
import { AttacheGrey } from '../../assets/assets'

const AddBook = () => {

  let history = useHistory();

    // const [state] = useContext(UserContext);
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState([]);
    const [preview, setPreview] = useState(null);

    const [form, setForm] = useState({
      title: "",
      publicationDate: "",
      pages: "",
      author: "",
      isbn: "",
      about: "",
      bookFile: ""
    });

    const getCategories = async () => {
      try {
        const response = await API.get("/categories");
        setCategories(response.data.data.categories)
      } catch (error) {
        console.log(error);
      }
    }

    const handleChangeCategoryId = (e) => {
      const id = e.target.value;
      const checked = e.target.checked;

      if (checked === true) {
        setCategoryId([...categoryId, parseInt(id)]);
      } else {
        const newCategoryId = categoryId.filter((categoryIdItem) => {
          return categoryIdItem !== id;
        });
        setCategoryId(newCategoryId);
      }
    };

    const handleChange = (e) => {
      setForm({
        ...form,
        [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
      });
      if (e.target.type === "file") {
        const url = URL.createObjectURL(e.target.files[0]);
        setPreview(url);
      }
    };

    const handleSubmit = async (e) => {
      try {
        e.preventDefault();
        const config = {
          headers: {
            "Content-type": "multipart/form-data",
          },
        };

        const formData = new FormData();
        formData.set("title", form.title);
        formData.set("publicationDate", form.publicationDate);
        formData.set("pages", form.pages);
        formData.set("author", form.author);
        formData.set("isbn", form.isbn);
        formData.set("about", form.about);
        formData.set("categoryId", form.categoryId);
        formData.set("bookFile", form.bookFile[0], form.bookFile[0].name);

        console.log(form);

        const response = await API.post('/book', formData, config);
        console.log(response);

        history.push("/admin");

      } catch (error) {
        console.log(error)
      }
    };

    useEffect(() => {
      getCategories();
    }, []);

    // if(!state.isLogin){
    //   return <Redirect to="/" />
    // }

    return (
        <div>
            <NavbarAdmin/>
            <p className="table-add-book-title">Add Book</p>
            <div className="input-add-book-box">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control className="input-add-book" type="text" placeholder="Title" style={{ marginTop: '20px'}} name="title" onChange={handleChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control className="input-add-book" type="text" placeholder="Publication Date" name="publicationDate" onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicFullname">
                  <Form.Control className="input-add-book" type="number" placeholder="Pages" name="pages" onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicFullname">
                  <Form.Control className="input-add-book" type="text" placeholder="Author" name="author" onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicFullname">
                  <Form.Control className="input-add-book" type="text" placeholder="ISBN" name="isbn" onChange={handleChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicFullname">
                    <Form.Control type="text" className="input-add-book" as="textarea"  placeholder="About This Book" name="about" onChange={handleChange} style={{ height: '200px', resize:"none" }}/>
                </Form.Group>

                <Form.Group className="mb-3 d-flex category-box" controlId="formBasicCheckbox">Category :
                  {categories.map((item) => (
                      <Form.Check className="ms-3 category-item" type="checkbox" value={item.id} onClick={handleChangeCategoryId} label={item.name} />
                  ))}
                </Form.Group>

                {preview && (
                  <div>
                    <img
                      src={preview}
                      style={{
                        maxWidth: "300px",
                        maxHeight: "300px",
                        objectFit: "cover",
                        marginBottom: "10px"
                      }}
                      alt="preview"
                    />
                  </div>
                )}

                <Form.Group className="mb-3" controlId="formTransferProof">
                    <Form.Label className="file-label-add-book" for="upload">Attache Book File <img className="attache-icon-add-book" src={AttacheGrey} alt="attache"/></Form.Label>
                    <Form.Control type="file" placeholder="file" id="upload" name="bookFile" onChange={handleChange} hidden/>
                </Form.Group>

                <Button variant="danger" type="submit" className="btn-submit-add-book ms-auto">
                  Add Book <BsBookmarkPlus className="icon-add-book-submit"/>
                </Button>
            </Form>
            </div>
            
        </div>
    )
}

export default AddBook
