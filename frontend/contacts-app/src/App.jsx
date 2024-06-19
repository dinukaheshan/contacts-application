import {useEffect, useState} from 'react'
import './App.css'
import Header from "./components/Header.jsx";
import {getContacts} from "./api/ContactService.jsx";
import ContactList from "./components/ContactList.jsx";
import {Route, Routes, Navigate} from "react-router-dom";

function App() {
    const [data, setData] = useState({})
    const [currentPage, setCurrentPage] = useState(0)

    const toggleModal = (show) => {
        console.log("I was clicked!")
    }

    const getAllContacts = async (page= 0, size = 10) => {
        try {
            setCurrentPage(page)
            const {data} = await getContacts(page, size)
            setData(data)
            console.log(data)
        }
        catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getAllContacts()
    }, []);

    return (
        <>
            <Header toggleModal={toggleModal} nbOfContacts={data.totalElements} />
            <main>
                <div className="container">
                <Routes>
                    <Route path="/" element={<Navigate to={'/contacts'}/>}/>
                    <Route path="/contacts" element={<ContactList data={data} currentPage={currentPage} getAllContacts={getAllContacts} />} />
                </Routes>
                </div>
            </main>
            {/* Modal */}
            <dialog ref={modalRef} className="modal" id="modal">
                <div className="modal__header">
                    <h3>New Contact</h3>
                    <i onClick={() => toggleModal(false)} className="bi bi-x-lg"></i>
                </div>
                <div className="divider"></div>
                <div className="modal__body">
                    <form onSubmit={handleNewContact}>
                        <div className="user-details">
                            <div className="input-box">
                                <span className="details">Name</span>
                                <input type="text" value={values.name} onChange={onChange} name='name' required />
                            </div>
                            <div className="input-box">
                                <span className="details">Email</span>
                                <input type="text" value={values.email} onChange={onChange} name='email' required />
                            </div>
                            <div className="input-box">
                                <span className="details">Title</span>
                                <input type="text" value={values.title} onChange={onChange} name='title' required />
                            </div>
                            <div className="input-box">
                                <span className="details">Phone Number</span>
                                <input type="text" value={values.phone} onChange={onChange} name='phone' required />
                            </div>
                            <div className="input-box">
                                <span className="details">Address</span>
                                <input type="text" value={values.address} onChange={onChange} name='address' required />
                            </div>
                            <div className="input-box">
                                <span className="details">Account Status</span>
                                <input type="text" value={values.status} onChange={onChange} name='status' required />
                            </div>
                            <div className="file-input">
                                <span className="details">Profile Photo</span>
                                <input type="file" onChange={(event) => setFile(event.target.files[0])} ref={fileRef} name='photo' required />
                            </div>
                        </div>
                        <div className="form_footer">
                            <button onClick={() => toggleModal(false)} type='button' className="btn btn-danger">Cancel</button>
                            <button type='submit' className="btn">Save</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </>
    )
}

export default App
