import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";
import { addCategory ,getAllCategory,updateCategories,deleteCategories as deleteCategoriesAction } from "../../action";
import NewModal from "../../components/UI/Model";
import CheckboxTree from "react-checkbox-tree";
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

import {
  IoIosCheckboxOutline,
  IoIosCheckbox,
  IoIosArrowForward,
  IoIosArrowDown,
} from "react-icons/io";
const Category = (props) => {
  const category = useSelector(state => state.category);
  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
  const [deleteCategoryModal, setDeleteCategoryModal] =  useState(false);
  const dispatch = useDispatch();

  const handleClose = () => {
    const form = new FormData();

    form.append("name", categoryName);
    form.append("parentId", parentCategoryId);
    form.append("categoryImg", categoryImage);
    dispatch(addCategory(form));
    setCategoryName("");
    setParentCategoryId("");
    // const cat = {
    //     categoryName,
    //     parentCategoryId,
    //     categoryImage
    // };
    //console.log(cat);
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
        myCategories.push(
            {
                label: category.name,
                value: category._id,
                children: category.children.length > 0 && renderCategories(category.children)
            }
        );
    }
    return myCategories;
}


  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  const updateCategory = () => {
    updateCheckedAndExpandedCategories();
    setUpdateCategoryModal(true);
  };

  const updateCheckedAndExpandedCategories = () =>{
    const checkedArray = [];
    const expandedArray = [];
    const categories = createCategoryList(category.categories);
    checked.length > 0 &&
      checked.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId === category.value
        );
        category && checkedArray.push(category);
      });
    expanded.length > 0 &&
      expanded.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId === category.value
        );
        category && expandedArray.push(category);
      });
    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);
  }


  const handleCategoryInput = (key, value, index, type) => {
    if (type == "checked") {
      const updatedcheckedArray = checkedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );
      setCheckedArray(updatedcheckedArray);
    } else if ((type = "expanded")) {
      const updatedExpandedArray = expandedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );
      setExpandedArray(updatedExpandedArray);
    }
  };

  const updateCategoriesForm = () =>{
    const form = new FormData();

    expandedArray.forEach((item, index) =>{
      console.log(item.value);
      form.append('_id',item.value);
      form.append('name',item.name);
      form.append('parentId',item.parentId ?  item.parentId : "");
      form.append('type',item.type)
    })

    checkedArray.forEach((item, index) =>{
      console.log(item.value);
      form.append('_id',item.value);
      form.append('name',item.name);
      form.append('parentId',item.parentId ?  item.parentId : "");
      form.append('type',item.type);
    });

    dispatch(updateCategories(form)).then(result =>{
      if(result){
        dispatch(getAllCategory)
      }
    })
    setUpdateCategoryModal(false)
  }

  
  const deleteCategory = () =>{
    updateCheckedAndExpandedCategories();
    setDeleteCategoryModal(true)
  }

  const deleteCategories = () =>{
    const checkedIdsArray = checkedArray.map((item,index)=>({
      _id: item.value
    }))
    const expandedIdsArray = expandedArray.map((item,index)=>({
      _id: item.value
    }))
    const IdsArray = expandedIdsArray.concat(checkedIdsArray);
    dispatch(deleteCategoriesAction(IdsArray)).then(
      result=>{
        if(result){
          dispatch(getAllCategory());
          setDeleteCategoryModal(false);
        }
      }
    );
  }

  const renderDeleteCategoryModal = () =>{
    return (
      <NewModal modalTitle="Confirm" show={deleteCategoryModal}
      handleClose ={() => setDeleteCategoryModal(false)}
      buttons={[
        {
          label: 'No',
          color: 'primary',
          onClick: () =>{
            alert('no');
          }  
        },
        {
          label: 'Yes',
          color: 'danger',
          onClick: deleteCategories,
        }
      ]}
      > <h5>Expanded</h5>{
        expandedArray.map((item, index) => <span key={index}>{item.name}</span>)
      }<h5>Checked</h5>{
        checkedArray.map((item, index) => <span key={index}>{item.name}</span>)
      }</NewModal>
    )
  }



  const renderUpdateCategoriesModal = () =>{
   
    return (

          <NewModal
          show={updateCategoryModal}
          handleClose={updateCategoriesForm}
          modalTitle={"Update Categories"}
          size="lg"
        >
          <Row>
            <Col>
              <h6> Expanded </h6>
            </Col>
          </Row>
  
  
          {expandedArray.length > 0 &&
            expandedArray.map((item, index) => (
              <Row key={index}>
                <Col>
                  <Input
                    value={item.name}
                    placeholder={"Category Name"}
                    onChange={(e) =>
                      handleCategoryInput(
                        "name",
                        e.target.value,
                        index,
                        "expanded"
                      )
                    }
                  />
                </Col>
                <Col>
                  <select
                    className="form-control"
                    value={item.parentId}
                    onChange={(e) =>
                      handleCategoryInput(
                        "parentId",
                        e.target.value,
                        index,
                        "expanded"
                      )
                    }
                  >
                    <option>select category</option>
                    {createCategoryList(category.categories).map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </Col>
                <Col>
                  <select className="form-control">
                    <option value=""> Select Name</option>
                    <option value="store"> Store</option>
                    <option value="product"> Product</option>
                    <option value="page"> Page</option>
                  </select>
                </Col>
              </Row>
            ))}
  
          <h6> Checked Array </h6>
  
          {checkedArray.length > 0 &&
            checkedArray.map((item, index) => (
              <Row key={index}>
                <Col>
                  <Input
                    value={item.name}
                    placeholder={"Category Name"}
                    onChange={(e) =>
                      handleCategoryInput(
                        "name",
                        e.target.value,
                        index,
                        "checked"
                      )
                    }
                  />
                </Col>
                <Col>
                  <select
                    className="form-control"
                    value={item.parentId}
                    onChange={(e) =>
                      handleCategoryInput(
                        "parentId",
                        e.target.value,
                        index,
                        "checked"
                      )
                    }
                  >
                    <option>select category</option>
                    {createCategoryList(category.categories).map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </Col>
                <Col>
                  <select className="form-control">
                    <option value=""> Select Name</option>
                    <option value="store"> Store</option>
                    <option value="product"> Product</option>
                    <option value="page"> Page</option>
                  </select>
                </Col>
              </Row>
            ))}
  
          {/* <input
            type="file"
            name="categoryImage"
            onChange={props.handleCategoryImage}
          ></input> */}
        </NewModal>
  )
  }

  const renderAddCategoryModal = () =>{
    return (
      <NewModal
        show={show}
        handleClose={handleClose}
        modalTitle={"Add New Category"}
      >
        <Input
          value={categoryName}
          placeholder={"category name"}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <select
          className="form-control"
          value={parentCategoryId}
          onChange={(e) => setParentCategoryId(e.target.value)}
        >
          <option>select category</option>
          {createCategoryList(category.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>

        <input
          type="file"
          name="categoryImage"
          onChange={props.handleCategoryImage}
        ></input>
      </NewModal>
    )
  }

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Category</h3>
              <button onClick={handleShow}> Add </button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            
              <CheckboxTree
                nodes={renderCategories(category.categories)}
                checked={checked}
                expanded={expanded}
                onCheck={checked => setChecked(checked)}
                onExpand={expanded => setExpanded(expanded)}
                icons={{
                  check: <IoIosCheckbox />,
                  uncheck: <IoIosCheckboxOutline />,
                  halfCheck: <IoIosCheckboxOutline />,
                  expandOpen: <IoIosArrowForward />,
                  expandClose: <IoIosArrowDown />,
                }}
                
            />
          </Col>
        </Row>
        <Row>
          <Col>
          <button onClick={deleteCategory}> Delete</button>
            <button onClick={updateCategory}>Update</button>
          </Col>
        </Row>
      </Container>
    
    {renderAddCategoryModal()}
    {renderUpdateCategoriesModal()}
    {renderDeleteCategoryModal()}
    

      
      
    </Layout>
  );
};

export default Category;
