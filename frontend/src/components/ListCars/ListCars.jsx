import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './mainbar.css';
import './ListCars.css';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';

function ListCars() {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // Brand ve Model için arama terimi
    const [currentPage, setCurrentPage] = useState(1); // Varsayılan olarak ilk sayfayı seçin

    const native = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8081/')
            .then(res => setData(res.data))
            .catch(err => {
                console.error("Veri alma hatası:", err);
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete('http://localhost:8081/delete/' + id)
            .then(res => {
                location.reload();
            })
            .catch(err => {
                console.error(err);
            });
    }

    // Brand ve Model arama terimine göre verileri filtrele
    const filteredData = data.filter(car => {
        const searchValue = searchTerm.toLowerCase();

        // Araba verisi olmayanları filtrelemeyi önlemek için kontrol ekleyin
        if (car.brand && car.model) {
            return car.brand.toLowerCase().includes(searchValue) || car.model.toLowerCase().includes(searchValue);
        }

        // Araba verisi olmayanları (null veya undefined) filtre dışı bırak
        return false;
    });


    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const itemsPerPage = 5; // Her sayfada gösterilecek öğe sayısı (örneğin, 10)
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const itemsToDisplay = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const firstPage = 1; // İlk sayfa numarası
    const lastPage = totalPages; // Toplam sayfa sayısı
    const pages = Array.from({ length: lastPage - firstPage + 1 }, (_, index) => firstPage + index);



    const goToPage = (page) => {
        setCurrentPage(page);
    };

    const handleAccountDeletion = () => {
        const confirmDelete = window.confirm("Hesabınızı kapatmak istediğinize emin misiniz?");
        if (confirmDelete) {
            // Kullanıcının hesap ve araba bilgilerini sil
            axios.delete('http://localhost:8081/deleteUser')
                .then((res) => {
                    console.log(res)
                    native('/');
                })
                .catch(err => {
                    console.error("Hesap silme hatası:", err);
                });
        }
    };

    return (
        <>
            <div className='mainbar'>
                <div className="rowcolor row mx-sm-1 mb-4">
                    <div className="col-10">
                        <h1 className='p-4 '><strong>My Cars</strong></h1>
                    </div>
                    <div className="col-2 d-flex p-4 ">
                        <div className="col-6 ">
                            <Link to="/" ><button className='btn bg-secondary' style={{ borderRadius: "5px", backgroundColor: "#a9a9a9", borderStyle: "none", color: "white" }}>LogOut</button></Link>
                        </div>
                        <div className="col-6 ">
                            <div className="dropdown mx-sm-4">
                                <a className="btn btn-secondary dropdown-toggle" href="#" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="person bi bi-person-circle p-1"></i>
                                </a>
                                <ul className="dropdown-menu bg-secondary" aria-labelledby="dropdownMenuLink">
                                    <li><a onClick={handleAccountDeletion} className="dropdown-item" style={{ backgroundColor: "#6C757D", borderStyle: "none", color: "white" }} href="#">Hesab Kapatma</a></li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='align-items-center container d-flex'>
                    <p className='mx-sm-2 mt-3'>Count</p>
                    <button style={{ borderRadius: "30px", height: "30px", borderStyle: "none", backgroundColor: "#a9a9a9" }}>{filteredData.length}</button>

                    <form className="d-flex justify-content-center align-items-center container">
                        <input
                            className="form-control border-top border-start border-end"
                            type="search"
                            placeholder="Search by Brand or Model"
                            staria-label="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="btn-group bg-white border-0 mx-sm-3 p-2" type="submit"><i className="bi bi-search mx-sm-2"></i>Search</button>
                    </form>
                </div>

                <button className='btn border-primary border-6 m-4'><i className="bi bi-plus-lg mx-sm-3 "></i> <Link to="/addcars" className='text-decoration-none'>Add New Car</Link></button>

                <div className='listcars'>
                    <div className='container'>
                        <table className='table table-hover'>
                            <thead className='table-primary mx-sm-4'>
                                <tr className='bg-primary mx-col-3 '>
                                    <th className="col-md-3">Car Name</th>
                                    <th>Brand</th>
                                    <th>Model</th>
                                    <th className="col-md-2">Year</th>
                                    <th >Plaka</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {itemsToDisplay.map((car, index) => {
                                    return (
                                        <tr key={index} >
                                            <td ><i className="person bi bi-person-circle  mx-sm-3"></i>{car.car_name}</td>
                                            <td className="custom-td">{car.brand}</td>
                                            <td className="custom-td">{car.model}</td>
                                            <td className="custom-td">{car.year}</td>
                                            <td className="custom-td">{car.plaka}</td>
                                            <td className="tdcolor">
                                                <Link to={`/editcars/${car.car_id}`} className='btn '><i className="bi bi-pencil"></i></Link>
                                                <button onClick={() => handleDelete(car.car_id)} className='btn'><i className="bi bi-trash"></i></button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        <nav className='border-0' aria-label="Page navigation">
                            <ul className="pagination justify-content-center  align-items-center ">
                                <li className="page-item ">
                                    <button onClick={goToPreviousPage} className="page-link" aria-label="Previous">
                                        <span aria-hidden="true">&laquo; Previous</span>
                                    </button>
                                </li>
                                {pages.map((page) => (
                                    <li className="page-item" key={page}>
                                        <button
                                            className="page-link"
                                            onClick={() => goToPage(page)}
                                        >
                                            {page}
                                        </button>
                                    </li>
                                ))}
                                <li className="page-item">
                                    <button onClick={goToNextPage} className="page-link" aria-label="Next">
                                        <span aria-hidden="true">&raquo; Next</span>
                                    </button>
                                </li>
                            </ul>

                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListCars;
