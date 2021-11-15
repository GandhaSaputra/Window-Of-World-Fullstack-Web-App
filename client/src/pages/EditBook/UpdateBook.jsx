import React, { useEffect, useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { useHistory, useParams } from 'react-router'
import NavbarAdmin from '../../components/NavbarAdmin/NavbarAdmin'
import { BsBookmarkPlus } from 'react-icons/bs';
import { AttacheGrey } from '../../assets/assets'
import { API } from '../../config/api/api'

const UpdateBook = () => {
    let { id } = useParams()
    const history = useHistory()
    const [book, setBook] = useState({})
    const [previewBookCover, setPreviewBookCover] = useState(null)
    const [previewBookFile, setPreviewBookFile] = useState(null)

    const [form, setForm] = useState({
        title: "",
        publicationDate: "",
        pages: 0,
        author: "",
        isbn: "",
        about: "",
        bookCover: "",
        bookFile: "",
    });

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()

            const config = {
                header: {
                    "Content-type": "multipart/form-data",
                }
            }

            const formData = new FormData()
            formData.set("title", form.title);
            formData.set("publicationDate", form.publicationDate);
            formData.set("pages", form.pages);
            formData.set("author", form.author);
            formData.set("isbn", form.isbn);
            formData.set("about", form.about);
            console.log(form.bookFile)
            if (form.bookFile[0].name !== undefined && form.bookCover[0].name === undefined) {
                formData.set("bookFile", form.bookFile[0], form.bookFile[0].name)
                formData.set("bookCover", form.bookCover)
            } else if (form.bookFile[0].name === undefined && form.bookCover[0].name !== undefined) {
                formData.set("bookFile", form.bookFile)
                formData.set("bookCover", form.bookCover[0], form.bookCover[0].name)
            } else if (form.bookFile[0].name === undefined && form.bookCover[0].name === undefined) {
                formData.set("bookFile", form.bookFile)
                formData.set("bookCover", form.bookCover)
            } else {
                formData.set("bookFile", form.bookFile[0], form.bookFile[0].name)
                formData.set("bookCover", form.bookCover[0], form.bookCover[0].name)
            }

            const response = await API.patch(`/book/${id}`, formData, config)
            console.log(response)
            history.push("/list-book-admin");
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value
        })

        if (e.target.name === "bookFile") {
            if (e.target.files[0] === undefined) {
                setForm({
                    ...form,
                    bookFile: "",
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
    }

    // const handleChangeCategoryId = () => {
    //     alert(test)
    // }
    console.log(form)

    const getBook = async () => {
        try {
            const response = await API.get(`/book/${id}`)

            //set book data to state variables
            setForm({
                ...form,
                title: response.data.data.book.title,
                publicationDate: response.data.data.book.publicationDate,
                pages: response.data.data.book.pages,
                author: response.data.data.book.author,
                isbn: response.data.data.book.isbn,
                about: response.data.data.book.about,
                bookFile: response.data.data.book.bookFile.replace("http://localhost:5000/uploads/", ""),
                bookCover: response.data.data.book.bookCover.replace("http://localhost:5000/uploads/", ""),
            })
            setPreviewBookFile(response.data.data.book.bookFileName)
            setPreviewBookCover(response.data.data.book.bookCover)
            setBook(response.data.data.book)
        } catch (error) {
            console.log(error)
        }

    }


    useEffect(() => {
        getBook()
    }, [])

    return (
        <Container>
            <NavbarAdmin />
            <Container>
                <p className="table-add-book-title">Update Book</p>
                <div className="input-add-book-box">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control className="input-add-book" type="text" placeholder="Title" style={{ marginTop: '20px' }} name="title" value={form.title} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control className="input-add-book" type="text" placeholder="Publication Date" name="publicationDate" value={form.publicationDate} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicFullname">
                            <Form.Control className="input-add-book" type="number" placeholder="Pages" name="pages" value={form.pages} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicFullname">
                            <Form.Control className="input-add-book" type="text" placeholder="Author" name="author" value={form.author} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicFullname">
                            <Form.Control className="input-add-book" type="text" placeholder="ISBN" name="isbn" value={form.isbn} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicFullname">
                            <Form.Control type="text" className="input-add-book" as="textarea" placeholder="About This Book" name="about" value={form.about} onChange={handleChange} style={{ height: '200px', resize: "none" }} />
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
                            Update Book <BsBookmarkPlus className="icon-add-book-submit" />
                        </Button>
                    </Form>
                </div>
            </Container>
        </Container>
    )
}

export default UpdateBook
