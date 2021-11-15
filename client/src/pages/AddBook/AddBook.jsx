import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import { BsBookmarkPlus } from 'react-icons/bs';
import { Container, Form, Button } from 'react-bootstrap';
import { API } from '../../config/api/api';

import './AddBook.css'
import NavbarAdmin from '../../components/NavbarAdmin/NavbarAdmin'
import { AttacheGrey } from '../../assets/assets'

const AddBook = () => {

  let history = useHistory();

  // const [categories, setCategories] = useState([]);
  // const [categoryId, setCategoryId] = useState([]);
  const [previewBookCover, setPreviewBookCover] = useState(null);
  const [previewBookFile, setPreviewBookFile] = useState(null)
  const [form, setForm] = useState({
    title: "",
    publicationDate: "",
    pages: "",
    author: "",
    isbn: "",
    about: "",
    bookCover: "",
    bookFile: ""
  });

  // const getCategories = async () => {
  //   try {
  //     const response = await API.get("/categories");
  //     setCategories(response.data.data.categories)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // const handleChangeCategoryId = (e) => {
  //   const id = e.target.value;
  //   const checked = e.target.checked;

  //   if (checked === true) {
  //     setCategoryId([...categoryId, parseInt(id)]);
  //   } else {
  //     const newCategoryId = categoryId.filter((categoryIdItem) => {
  //       return categoryIdItem !== id;
  //     });
  //     setCategoryId(newCategoryId);
  //   }
  // };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
    });
    if (e.target.name === 'bookFile') {
      if (e.target.files[0] === undefined) {
        setForm({
          ...form,
          bookFile: ""
        })
        setPreviewBookFile(null)
      } else {
        let textBookFile = e.target.files[0].name
        setPreviewBookFile(textBookFile)
      }
    }

    if (e.target.name === 'bookCover') {
      if (e.target.files[0] === undefined) {
        setForm({
          ...form,
          bookCover: "",
        })
        setPreviewBookCover(null)
      } else {
        let url = URL.createObjectURL(e.target.files[0])
        setPreviewBookCover(url)
      }
    }
  };

  // const handleChangeFile = (e) => {
  //   setForm({
  //     ...form,
  //     [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
  //   });
  //   if (e.target.files[0].type === "image/jpeg") {
  //     const url = URL.createObjectURL(e.target.files[0]);
  //     setPreviewBookCover(url);
  //   }
  //   if (e.target.files[0].type === "image/png") {
  //     const url = URL.createObjectURL(e.target.files[0]);
  //     setPreviewBookCover(url);
  //   }
  // }

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
      // formData.set("categoryId", form.categoryId);
      formData.set("bookCover", form.bookCover[0], form.bookCover[0].name);
      formData.set("bookFile", form.bookFile[0], form.bookFile[0].name);

      await API.post('/book', formData, config);
      // console.log(response);

      history.push("/list-book-admin");

    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    // getCategories();
  }, []);

  // if(!state.isLogin){
  //   return <Redirect to="/" />
  // }

  return (
    <Container>
      <NavbarAdmin />
      <p className="table-add-book-title">Add Book</p>
      <Container className="input-add-book-box">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control className="input-add-book" type="text" placeholder="Title" style={{ marginTop: '20px' }} name="title" onChange={handleChange} />
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
            <Form.Control className="input-add-book" type="text" placeholder="ISBN" name="isbn" onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicFullname">
            <Form.Control type="text" className="input-add-book" as="textarea" placeholder="About This Book" name="about" onChange={handleChange} style={{ height: '200px', resize: "none" }} />
          </Form.Group>

          {/* <Form.Group className="mb-3 d-flex category-box" controlId="formBasicCheckbox">Category :
            {categories.map((item) => (
              <Form.Check className="ms-3 category-item" type="checkbox" value={item.id} onClick={handleChangeCategoryId} label={item.name} />
            ))}
          </Form.Group> */}

          <Form.Group className="mb-3" controlId="formAttacheBookFile">
            <Form.Label className="file-label-add-book-file" for="uploadBookFile">Attache Book File <img className="attache-icon-add-book-file" src={AttacheGrey} alt="attache" /></Form.Label>
            <Form.Control hidden type="file" placeholder="Book File" id="uploadBookFile" name="bookFile" onChange={handleChange} />
          </Form.Group>

          {previewBookFile && (
            <div>
              <p>{previewBookFile}</p>
            </div>
          )}

          <Form.Group className="mb-3" controlId="formAttacheBookCover">
            <Form.Label className="file-label-add-book-cover" for="uploadBookCover">Attache Book Cover <img className="attache-icon-add-book" src={AttacheGrey} alt="attache" /></Form.Label>
            <Form.Control type="file" placeholder="file" id="uploadBookCover" name="bookCover" onChange={handleChange} hidden />
          </Form.Group>

          {previewBookCover && (
            <div>
              <img
                src={previewBookCover}
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

          <Button variant="danger" type="submit" className="btn-submit-add-book ms-auto mb-5">
            Add Book <BsBookmarkPlus className="icon-add-book-submit" />
          </Button>
        </Form>
      </Container>
    </Container>
  )
}

export default AddBook
