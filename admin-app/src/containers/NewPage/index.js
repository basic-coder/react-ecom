import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input'
import NewModal from '../../components/UI/Model'
import { Row, Col, Container } from 'react-bootstrap';
import {useSelector,  useDispatch} from 'react-redux'
import linearCategories from '../../helpers/linearCategories'
import { createPage } from '../../action';

export default function NewPage(props) {

    const [createModal, setCreateModal] = useState(false)
    const [title, setTitle] = useState('')
    const category = useSelector(state => state.category);
    const [categories, setCategories] = useState([])
    const [categoryId, setCategoryId] = useState('')
    const [desc, setDesc] = useState('');
    const [type, setType] = useState('');
    const [banners, setBanners] = useState([]);
    const [products,setProducts] = useState([]);
    const page = useSelector(state => state.page)
    const dispatch = useDispatch();

    const handleBannerImages = (e) =>{
        console.log(e);
        setBanners([...banners,e.target.files[0]]);
    }
    console.log(category)
    const onCategoryChange = (e) =>{
        const category =categories.find(category => category.value == e.target.value);
        console.log(category)
        setCategoryId(e.target.value);
        console.log(category.type)
        setType(category.type)
    }

    const handleProductImages = (e) =>{
        console.log(e);
        setProducts([...products,e.target.files[0]]);
    }

    useEffect(() => {
        setCategories(linearCategories(category.categories))
        },[category])


    useEffect(() =>{
        if(!page.loading){
            setCreateModal(false);
            setTitle('');
            setDesc('');
            setProducts('');
            setCategoryId('');
            setBanners('');
        }
    },[page])
    const submitPageForm = (e) =>{
        //e.target.preventDefault();

        if(title === ""){
            alert("Title is required");
            setCreateModal(false);
            return;
        }


        const form = new FormData();
        form.append('title',title);
        form.append('description',desc);
        form.append('category',categoryId);
        form.append('type',type)
        banners.forEach((banner,index) =>{
            form.append('banners',banner);
        })
        products.forEach((product,index) =>{
            form.append('products',product);
        })

        dispatch(createPage(form))

    }

    const renderCreatePageModal = () =>{
        return(
            <NewModal 
                show={createModal}
                modalTitle={'Create New Page'}
                handleClose={() => setCreateModal(false)}
                onSubmit={submitPageForm}
            >

            <Container>
                <Row>
                    <Col>
                    {/* <select className="form-control form-control-sm" value={categoryId} 
                    onChange={onCategoryChange}>
                        
                        <option>Select Category</option>
                        {
                            categories.map(cat=>
                                <option key={cat._id} value={cat._id} >{cat.name} </option>
                                )
                        }
                    </select> */}
                    <Input placeholder={'Select Category'} type="select" value={categoryId} onChange={onCategoryChange} options={categories}></Input>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Input value={title} onChange={(e) =>setTitle(e.target.value)} className="form-control-sm"
                    placeholder={'Page Title'}/>
                    
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Input value={desc} onChange={(e) =>setDesc(e.target.value)} className="form-control-sm"
                    placeholder={'Page Description'}/>
                    
                    </Col>
                </Row>
                
                <Row>
                    {
                        banners.length >0 ?
                        banners.map((banners, index)=>
                            <Row key={index}>
                                <Col>{banners.name}</Col>
                            </Row>
                        ): null
                    }
                    <Col>
                    <Input type="file" className="form-control-sm" name="banners" onChange={handleBannerImages}></Input>
                    </Col>
                </Row>

                <Row>
                        {
                            products.length >0 ?
                            products.map((products, index)=>
                                <Row>
                                    <Col>{products.name}</Col>
                                </Row>
                            ): null
                        }
                    <Col>
                    <Input type="file" className="form-control-sm" name="products" onChange={handleProductImages}></Input>
                    </Col>
                </Row>

                </Container>
            </NewModal>

        )
    }

    return (
        <div>
            <Layout sidebar>
                {
                    page.loading ?
                    <>creating page</>:
                    <>
                    {renderCreatePageModal()}
            <button onClick={() => setCreateModal(true)}>Create Page</button>
                    </>
                }
            

            </Layout>

        </div>
    )
}
