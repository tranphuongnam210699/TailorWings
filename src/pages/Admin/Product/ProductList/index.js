/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import "./Products.scss";
import { Switch, Checkbox, message } from "antd";
import { Link } from "react-router-dom";
import NonSelect from "./NonSelect";
import Selected from "./Selected";
import {
    setDocument,
    deleteImage,
    deleteDocument,
} from "../../../../services/Fundamental";
import ProductList from "./ProductList";

export class Products extends Component {
    constructor(props) {
        super(props);
        this.isLoading = false;
        this.state = {
            isLoading: false,
            isAnySelected: false,
            selectedProducts: [],
            renderProducts: [],
            initialProducts: [],
            checkedList: null,
            checkedAll: false,
            plainOptions: [],
            isCheckBoxVisible: true,
            currentCollectionStatus: [],
            currentCollectionFilterIndex: "",
            isFirstLoaded: false
        };
    }

    componentDidMount() {
        this._isMounted = true;
        const { products, designs, fabrics } = this.props;
        if (products != null) {
            let checkedList = {};
            let renderProducts = [...products];
            renderProducts.forEach((product) => {
                if (product != null) {
                    //
                    checkedList[product.productID] = false;
                    //
                    let currentDesign = designs.find(
                        (design) => design.id === product.designID
                    ) || { name: "No Data", price: 0, length: 0 };
                    //
                    let currentFabric = fabrics.find(
                        (fabric) => fabric.id === product.fabricID
                    ) || { price: 0 };
                    //
                    let designName = currentDesign.name;
                    product.name = product.default
                        ? designName + " - " + "DEFAULT"
                        : designName;
                    product.price =
                        currentDesign.price +
                        (currentFabric.price * currentDesign.length) / 100 +
                        400000;
                }
            });
            if (this._isMounted) {
                this.setState({
                    initialProducts: renderProducts,
                    renderProducts,
                    checkedList,
                    currentCollectionStatus: new Array(
                        renderProducts.length
                    ).fill(false),
                });
            }
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onSelectAll = (e) => {
        let { checkedList } = this.state;
        const { renderProducts } = this.state;
        let checkedStatus = e.target.checked;
        if (checkedStatus) {
            renderProducts.forEach((product) => {
                if (product != null) {
                    checkedList[product.productID] = true;
                }
            });
            this.setState({
                selectedProducts: [...renderProducts],
                isAnySelected: true,
                checkedAll: true,
                checkedList,
            });
        } else {
            renderProducts.forEach((product) => {
                if (product != null) {
                    checkedList[product.productID] = false;
                }
            });
            this.setState({
                selectedProducts: [],
                isAnySelected: false,
                checkedAll: false,
                checkedList,
            });
        }
    };

    onSelectOne = (e) => {
        let { checkedList, selectedProducts } = this.state;
        const { renderProducts } = this.state;
        let productID = e.target.name;
        let isChecked = e.target.checked;
        if (isChecked) {
            let selectedProduct = renderProducts.find(
                (product) => product.productID === productID
            );
            if (selectedProduct != null) {
                selectedProducts.push(selectedProduct);
                checkedList[productID] = true;
                this.setState({
                    selectedProducts,
                    checkedList,
                    isAnySelected: true,
                });
            } else {
                console.log("Current selected product is out of database list");
            }
        } else {
            let indexOfSelected = selectedProducts.indexOf(
                (product) => product.productID === productID
            );
            selectedProducts.splice(indexOfSelected, 1);
            if (selectedProducts != null) {
                checkedList[productID] = false;
                this.setState({
                    selectedProducts,
                    checkedList,
                    isAnySelected: selectedProducts.length > 0 ? true : false,
                    checkedAll: false,
                });
            } else {
                console.log("Current selected product is out of database list");
            }
        }
    };

    onSpecificVisibilityChange = (index) => {
        let { renderProducts } = this.state;
        renderProducts[index].visibility = !renderProducts[index].visibility;
        // upload this to firebase
        setDocument(
            "products",
            renderProducts[index],
            renderProducts[index].id
        ).then((success) => {
            if (success) {
                this.setState({
                    renderProducts,
                });
            }
        });
    };

    onCategoryFilter = (catID) => {
        const { products } = this.props;
        let renderProducts = [];
        if (catID === "allProducts") {
            renderProducts = [...products];
            this.setState({
                renderProducts,
            });
        } else {
            renderProducts = [
                ...products.filter((product) => product.catID === catID),
            ];
        }
        if (renderProducts != null) {
            this.setState({
                renderProducts,
                isFirstLoaded: false,
            });
        }
    };

    onCollectionFilter = (collectionID) => {
        const { collections } = this.props;
        let { currentCollectionStatus, renderProducts } = this.state;
        let currentCollection = collections.filter((collection) => {
            return collection.id === collectionID;
        });
        if (collectionID !== "allProducts") {
            if (currentCollection != null) {
                currentCollectionStatus.fill(false);
                currentCollection[0].products.forEach((productID) => {
                    let index = renderProducts.findIndex(
                        (product) => product.productID === productID
                    );
                    if (index > -1) {
                        currentCollectionStatus[index] = true;
                    }
                });
                this.setState({
                    currentCollectionStatus,
                    isCheckBoxVisible: false,
                    currentCollectionFilterIndex: collections.findIndex(
                        (collection) => collection.id === collectionID
                    ),
                    isFirstLoaded: false,
                });
            }
        } else {
            this.setState({
                isCheckBoxVisible: true,
                currentCollectionFilterIndex: "",
                isFirstLoaded: false,
            });
        }
    };

    deleteHanding = () => {
        this._isMounted = true;
        const { selectedProducts } = this.state;
        this.isLoading = true;
        if (selectedProducts != null) {
            let allDeletedImagePath = selectedProducts.flatMap((product) => {
                let imagePath = product.image.map((url) => {
                    let path = url.match(/\o\/(.*)\?\b/)[1];
                    path = this.decode_utf8(path);
                    return path;
                });
                return imagePath;
            });
            let productDeletePromiseArray = selectedProducts.map((product) => {
                return deleteDocument("products", product.id);
            });
            Promise.all(productDeletePromiseArray)
                .then(() => {
                    let imageDeletePromiseArray = allDeletedImagePath.map(
                        (path) => {
                            return deleteImage(path);
                        }
                    );
                    Promise.all(imageDeletePromiseArray)
                        .then(() => {
                            this.isLoading = false;
                        })
                        .catch(() => {});
                })
                .catch(() => {});
        }
    };

    decode_utf8 = (s) => {
        return decodeURIComponent(s);
    };

    setVisibilityHandling = (isVisible) => {
        this.isLoading = true;
        const { selectedProducts } = this.state;
        let changedProducts = selectedProducts.filter((product) => {
            if (product.visibility !== isVisible) {
                product.visibility = isVisible;
                return product;
            }
        });
        let settingPromiseArray = changedProducts.map((product) => {
            return setDocument("products", product, product.id);
        });
        Promise.all(settingPromiseArray).then(() => {
            this.isLoading = false;
        });
    };

    updateDiscountHandling = (discountType, valueDiscountK, valueDiscountP) => {
        const { selectedProducts } = this.state;
        let changedProducts = [...selectedProducts];
        switch (discountType) {
            case "K":
                if (!isNaN(valueDiscountK)) {
                    changedProducts.forEach((product) => {
                        product.discount = Number(valueDiscountK);
                    });
                } else {
                    message.error("Thất bại. Vui lòng nhập chữ số");
                }
                break;
            case "P":
                if (!isNaN(valueDiscountP)) {
                    changedProducts.forEach((product) => {
                        product.discount = Number(valueDiscountP);
                        product.discount = Math.ceil(
                            (product.price * product.discount) / (100 * 1000)
                        );
                    });
                } else {
                    message.error("Thất bại. Vui lòng nhập chữ số");
                }
                break;

            default:
                break;
        }
        let settingPromiseArray = changedProducts.map((product) => {
            return setDocument("products", product, product.id);
        });
        Promise.all(settingPromiseArray).then(() => {
            this.isLoading = false;
        });
    };

    priceCalculationHandling = (
        purePrice,
        productDiscount,
        categoryDiscount
    ) => {
        let discountPrice = purePrice;
        if (productDiscount > 0) {
            discountPrice = purePrice - productDiscount * 1000;
        } else if (categoryDiscount > 0) {
            discountPrice = purePrice - categoryDiscount * 1000;
        } else {
            // do nothing
        }
        discountPrice = discountPrice / 1000;
        discountPrice = Math.ceil(discountPrice) * 1000;
        return discountPrice;
    };

    onSearching = (searchedProducts) => {
        this.setState({
            renderProducts: searchedProducts,
            isFirstLoaded: false,
        });
    };

    onCollectionStatusChange = (index, currentStatus, productID) => {
        let { collections } = this.props;
        let { currentCollectionStatus } = this.state;
        let collectionIndex = this.state.currentCollectionFilterIndex;
        if (currentStatus) {
            let removedProductIndex = collections[
                collectionIndex
            ].products.indexOf(productID);
            if (removedProductIndex > -1) {
                collections[collectionIndex].products.splice(
                    removedProductIndex,
                    1
                );
                setDocument(
                    "collections",
                    collections[collectionIndex],
                    collections[collectionIndex].id
                ).then(() => {
                    currentCollectionStatus[index] = false;
                    this.setState({
                        currentCollectionStatus,
                    });
                });
            }
        } else {
            collections[collectionIndex].products.push(productID);
            setDocument(
                "collections",
                collections[collectionIndex],
                collections[collectionIndex].id
            ).then(() => {
                currentCollectionStatus[index] = true;
                this.setState({
                    currentCollectionStatus,
                });
            });
        }
    };

    onCheckBoxVisibile = (index, productID, checkedStatus) => {
        const {
            isCheckBoxVisible,
            checkedAll,
            currentCollectionStatus,
        } = this.state;
        if (isCheckBoxVisible) {
            let checkBox =
                productID === "tableHeader" ? (
                    <Checkbox
                        onChange={this.onSelectAll}
                        checked={checkedAll}
                    />
                ) : (
                    <Checkbox
                        name={productID}
                        onChange={(e) => this.onSelectOne(e)}
                        checked={checkedStatus}
                    />
                );
            return checkBox;
        } else {
            let collectionSwitch =
                productID !== "tableHeader" ? (
                    <Switch
                        checked={currentCollectionStatus[index]}
                        onChange={() =>
                            this.onCollectionStatusChange(
                                index,
                                currentCollectionStatus[index],
                                productID
                            )
                        }
                    />
                ) : (
                    ""
                );
            return collectionSwitch;
        }
    };

    // Function name: firstLoadedConfirm
    // Description: to turn on flag that data has been loaded first time
    firstLoadedConfirm = () => {
        this.setState({
            isFirstLoaded: true,
        });
    };
    // END

    render() {
        const { products, designs, categories, collections } = this.props;
        const {
            isAnySelected,
            selectedProducts,
            checkedList,
            renderProducts,
            initialProducts,
            isFirstLoaded,
        } = this.state;
        return (
            <div className="pageProduct">
                <div className="headerPageProduct d-flex flex-row justify-content-between align-items-center">
                    <h2
                        className="d-flex justify-content-start"
                        style={{ margin: 0 }}
                    >{`Products (${products.length})`}</h2>
                    <Link to="/admin/product-add">
                        <div
                            className="buttonAddProduct d-flex justify-content-end"
                            style={{ width: "12vw" }}
                        >
                            <span
                                className="d-flex justify-content-center"
                                style={{ width: "100%" }}
                            >
                                Add Product
                            </span>
                        </div>
                    </Link>
                </div>
                <div className="showProduct ">
                    <NonSelect
                        isOpen={!isAnySelected}
                        collections={collections}
                        categories={categories}
                        onCategoryFilter={this.onCategoryFilter}
                        onCollectionFilter={this.onCollectionFilter}
                        initialProducts={initialProducts}
                        onSearching={this.onSearching}
                    />
                    <Selected
                        isOpen={isAnySelected}
                        selectedProducts={selectedProducts}
                        deleteHanding={this.deleteHanding}
                        setVisibilityHandling={this.setVisibilityHandling}
                        updateDiscountHandling={this.updateDiscountHandling}
                    />
                    <ProductList
                        renderProducts={renderProducts}
                        categories={categories}
                        checkedList={checkedList}
                        designs={designs}
                        isFirstLoaded={isFirstLoaded}
                        onCheckBoxVisibile={this.onCheckBoxVisibile}
                        priceCalculationHandling={this.priceCalculationHandling}
                        onSpecificVisibilityChange={
                            this.onSpecificVisibilityChange
                        }
                        firstLoadedConfirm={this.firstLoadedConfirm}
                    />
                </div>
            </div>
        );
    }
}

export default Products;