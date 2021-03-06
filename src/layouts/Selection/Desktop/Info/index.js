import { updateSelectedProduct } from "actions/selection";
import { message } from "antd";
import InfoDesktop from "components/Pages/Selection/Desktop/Info";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modifyPrice } from "services/CommonFunctions";

function InfoContainerDesktop() {
    /*--------------*/
    const renderProduct = useSelector((state) => state.selection.renderProduct);
    const renderPatterns = useSelector(
        (state) => state.selection.renderPatterns
    );
    const selectedDesign = useSelector(
        (state) => state.selection.selectedDesign
    );
    const selectedFabricType = useSelector(
        (state) => state.selection.selectedFabricType
    );
    /*--------------*/
    const [price, setPrice] = useState(0);
    const [renderPrice, setRenderPrice] = useState(0);
    /*--------------*/
    const dispatch = useDispatch();
    /*--------------*/
    useEffect(() => {
        /*--------------*/
        if (
            renderProduct &&
            renderPatterns.length > 0 &&
            selectedDesign &&
            selectedFabricType
        ) {
            /*--------------*/
            let selectedPattern =
                renderPatterns.find(
                    (pattern) => pattern.id === renderProduct.idPattern
                ) || null;
            /*--------------*/
            if (selectedPattern) {
                /*--------------*/
                let fabricPrice =
                    (selectedDesign.usedFabric / 100) *
                    (selectedPattern.price + selectedFabricType.price);
                /*--------------*/
                let finalPrice =
                    1.3 *
                    (fabricPrice +
                        selectedDesign.processPrice +
                        selectedDesign.designPrice);
                finalPrice = Math.ceil(finalPrice / 1000) * 1000;
                /*--------------*/
                let modifiedPrice = 0;
                /*--------------*/
                if (isNaN(finalPrice)) {
                    /*--------------*/
                    modifiedPrice = 0;
                    /*--------------*/
                } else {
                    /*--------------*/
                    modifiedPrice = modifyPrice(finalPrice);
                    /*--------------*/
                }
                /*--------------*/
                setPrice(finalPrice);
                /*--------------*/
                setRenderPrice(modifiedPrice);
                /*--------------*/
            }
        }
        /*--------------*/
    }, [
        renderProduct,
        renderPatterns.toString(),
        selectedDesign,
        selectedFabricType,
    ]);
    /*--------------*/
    /*********************************
     *  Description: update Selected Product to store
     *
     *
     *  Call by:
     */
    function onConfirmClick() {
        if (typeof selectedFabricType === "object") {
            /*--------------*/
            if (renderProduct && renderPatterns) {
                /*--------------*/
                const { name, image, idProduct, idPattern } = renderProduct;
                /*--------------*/
                let patternImage = renderPatterns.find(
                    (pattern) => pattern.id === idPattern
                );
                patternImage = patternImage ? patternImage.image.normal : "";
                /*--------------*/
                let info = {
                    name,
                    image: { ...image, pattern: patternImage },
                    price,
                    idProduct,
                    fabricType: {
                        id: selectedFabricType.id,
                        name: selectedFabricType.name,
                    },
                };
                /*--------------*/
                const action_updateSelectedProduct = updateSelectedProduct(
                    info
                );
                dispatch(action_updateSelectedProduct);
                /*--------------*/
            }
            /*--------------*/
        } else {
            /*--------------*/
            message.error("Vui lòng chọn chất liệu vải mong muốn!");
            /*--------------*/
        }
    }
    /************_END_****************/
    /*--------------*/
    if (!renderProduct) return <Fragment />;
    const { name, id } = renderProduct;
    return (
        <section className="l-selection__Info-desktop">
            <InfoDesktop
                productID={id}
                name={name}
                price={renderPrice}
                designedBy={"Tailor Wings"}
                onConfirmClick={onConfirmClick}
            />
        </section>
    );
}

export default InfoContainerDesktop;
