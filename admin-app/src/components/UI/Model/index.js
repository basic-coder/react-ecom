import React from "react";
import { Modal, Button } from "react-bootstrap";


const NewModal = (props) =>{
    return(
    <Modal size={props.size} show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
            {/* <Input value={categoryName} placeholder={'category name'} onChange={(e) => setCategoryName(e.target.value)} />
            <select className="form-control" 
            value={parentCategoryId}
            onChange={(e) => setParentCategoryId(e.target.value)}
            >
                <option>select category</option>
                {
                    createCategoryList(category.categories).map(option =><option key={option.value} value={option.value}>{option.name}</option>)
                }
            </select>

            <input type="file" name="categoryImage" onChange={props.handleCategoryImage}></input> */}
            {props.children}
            </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={props.handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default NewModal;