import { Fragment } from "react";

interface MainImageProps {
    className?: string;
    imageUrlOne?: string;
    imageUrlTwo?: string;
    imageUrlThree?: string;
    titleOne: string;
    titleTwo: string;
    titleThree: string;
    textOne?: string;
    textTwo?: string;
    textThree?: string;
    idOne?: number;
    idTwo?: number;
    idThree?: number;
}


const MainImage: React.FC<MainImageProps> = ({
    className = "",
    imageUrlOne = "",
    imageUrlTwo = "",
    imageUrlThree = "",
    titleOne,
    titleTwo,
    titleThree,
    textOne,
    textTwo,
    textThree,
    idOne,
    idTwo,
    idThree,
}) => {
    return (
        <Fragment>
            <div className="main-image-container">
                <input type="radio" name="tabmenu" id="tab1" defaultChecked/>
                <input type="radio" name="tabmenu" id="tab2" />
                <input type="radio" name="tabmenu" id="tab3" />
                <div className="main-image-wrapper">
                    <div className="main-image">
                        <div>
                            <img src={imageUrlOne} alt="Movie Image"/>
                            <h1>{titleOne}</h1>
                            <h2>Summary <br/><hr/>{textOne}</h2>
                        </div>
                        <div>
                            <img src={imageUrlTwo} alt="Movie Image"/>
                            <h1>{titleTwo}</h1>
                            <h2>Summary <br/><hr/>{textTwo}</h2>
                        </div>
                        <div>
                            <img src={imageUrlThree} alt="Movie Image"/>
                            <h1>{titleThree}</h1>
                            <h2>Summary <br/><hr/>{textThree}</h2>
                        </div>
                    </div>
                </div>
                <div className="main-image-btn">
                    <label htmlFor="tab1"></label>
                    <label htmlFor="tab2"></label>
                    <label htmlFor="tab3"></label>
                </div>
            </div>
        </Fragment>
    )
}

export default MainImage;