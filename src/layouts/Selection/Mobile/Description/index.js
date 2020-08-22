import SelectionDescription from "components/Pages/Selection/Description";
import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchDesignInfo, fetchFabricInfo } from "services/Firebase API/basic";

function DescriptionContainer() {
    /*--------------*/
    const renderProduct = useSelector((state) => state.selection.renderProduct);
    /*--------------*/
    const [designInfo, setDesignInfo] = useState([]);
    const [fabricInfo, setFabricInfo] = useState([]);
    /*--------------*/
    useEffect(() => {
        /*--------------*/
        async function _fetchInfo() {
            try {
                const designInfo = await fetchDesignInfo(
                    renderProduct.designID
                );
                const fabricInfo = await fetchFabricInfo(
                    renderProduct.fabricID
                );
                /*--------------*/
                if (designInfo !== "") {
                    let designInfoModified = designInfo.split(".");
                    designInfoModified = designInfoModified.filter(info => info !== '');
                    setDesignInfo(designInfoModified);
                }
                if (fabricInfo !== "") {
                    let fabricInfoModified = fabricInfo.split("-");
                    fabricInfoModified = fabricInfoModified.filter(info => info !== '');
                    setFabricInfo(fabricInfoModified);
                }
                /*--------------*/
            } catch (error) {
                console.log("error.message :>> ", error.message);
            }
        }
        /*--------------*/
        if (renderProduct) {
            _fetchInfo();
        }
    }, [renderProduct]);
    /*--------------*/
    if (!renderProduct) return <Fragment />;
    return (
        <div className="l-selection__desc">
            <SelectionDescription
                designDesc={designInfo}
                fabricDesc={fabricInfo}
            />
        </div>
    );
}

export default DescriptionContainer;
