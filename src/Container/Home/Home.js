import React, { Component } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Product from "../../components/Products/Product/Product";
import axios from "axios";
import { Form, FormControl, Button } from "react-bootstrap";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      searchFriends: [],
      searchValue: "",
    };
  }

  componentWillMount() {
    this.getAllProducts();
  }

  componentDidMount() {
    console.log(this.props);
  }

  intializeState = () => {
    setTimeout(() => {
      this.setState({ deleteSuccess: false });
    }, 2000);
  };

  getAllProducts = () => {
    axios.get("http://localhost:3000/productlist").then(
      (response) => {
        console.log(response);
        console.log(response.data);
        this.setState({ productList: response.data });
        this.setState({ searchProducts: response.data });
        console.log(this.state.productList);
      },
      (error) => {
        console.error(error);
      }
    );
  };
  openAddProduct = () => {
    this.props.history.push("/addProduct");
  };

  getSearch = (e) => {
    let searchV = e.target.value;
    if (searchV === "") {
      this.getAllProducts();
    }
    this.setState({ searchValue: searchV });
    console.log(searchV);
    let searchF = this.state.productList.filter((f) => {
      console.log(f.value);
      return f.includes(searchV);
    });
    console.log(searchF);
    this.setState({ productList: searchF });
  };
  renderAllProducts = () => {
    return this.state.productList.map((product) => {
      return (
        <Product
          key={product.id}
          id={product.id}
          name={product.value}
          price={product.price}
          image={product.img}
          deleteId={this.deleteProductWithId}
          editId={this.editProductWithId}
        ></Product>
      );
    });
  };
  render() {
    return (
      <div>
        <Navbar />
        <Form inline>
          <span>
            <FormControl
              type="text"
              placeholder="Search"
              onChange={this.getSearch}
              className="mr-sm-1"
            />

            <Button variant="outline-primary">Search</Button>
            <Button
              style={{ float: "right" }}
              onClick={this.openAddProduct}
              variant="outline-primary"
            >
              AddProduct
            </Button>
          </span>
        </Form>
        <br></br>
        <br></br>
        <h2>Product List</h2>
        <div>{this.renderAllProducts()}</div>
      </div>
    );
  }
}

export default Home;
