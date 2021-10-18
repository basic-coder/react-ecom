import React, { useEffect, useState } from 'react'
import { Container, Row, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategory} from '../../action/category.action'
import Layout from '../../components/Layout'
import Input from '../../components/UI/Input'
import { addCategory } from '../../action'
import NewModal from '../../components/UI/Model'

const Category = (props) =>{
    const category = useSelector(state => state.category);
    const [show, setShow] =useState(false);
    const [categoryName, setCategoryName] = useState('')
    const [categoryImage, setCategoryImage] = useState('')
    const [parentCategoryId, setParentCategoryId] = useState('')
    const dispatch = useDispatch();
   

    const handleClose = () => {

        const form = new FormData();

        form.append('name',categoryName);
        form.append('parentId',parentCategoryId);
        form.append('categoryImg',categoryImage);
        dispatch(addCategory(form))
        setCategoryName('');
        setParentCategoryId('');
        // const cat = {
        //     categoryName,
        //     parentCategoryId,
        //     categoryImage
        // };
        //console.log(cat);
        setShow(false);
    } 
    const handleShow = () => setShow(true);

    const renderCategories = (categories) =>{

        let myCategories = [];
        for(let category of categories){
            myCategories.push(
                <li>
                    {category.name}
                    {category.children.length > 0 ? (<ul>{renderCategories(category.children)}</ul>): null}
                </li>
            )
        }
        return myCategories

    }

    const createCategoryList = (categories, options = []) =>{
        for(let category of categories){
            options.push({ value: category._id, name: category.name});
            if(category.children.length > 0){
                createCategoryList(category.children, options)
            }
        }
        return options
    }

    const handleCategoryImage = (e)=>{
        setCategoryImage(e.target.files[0]);
    }

    return (
    <Layout sidebar>
        <Container>
            <Row>
                <Col md={12}>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <h3>Category</h3>
                        <button onClick={handleShow}> Add </button>
                        </div>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <ul>    
                        {renderCategories(category.categories)}
                    </ul>
                </Col>
            </Row>
               
        </Container>
        <NewModal
            show={show}
            handleClose={handleClose}
            modalTitle={"Add New Category"}
        >
            <Input value={categoryName} placeholder={'category name'} onChange={(e) => setCategoryName(e.target.value)} />
            <select className="form-control" 
            value={parentCategoryId}
            onChange={(e) => setParentCategoryId(e.target.value)}
            >
                <option>select category</option>
                {
                    createCategoryList(category.categories).map(option =><option key={option.value} value={option.value}>{option.name}</option>)
                }
            </select>

            <input type="file" name="categoryImage" onChange={props.handleCategoryImage}></input>
        </NewModal>

        
    </Layout>)
}

export default Category