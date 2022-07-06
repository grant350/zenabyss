

// import React from 'react';


// class ImageInput extends React.Component {

//   constructor(props) {
//     super(props)
//     this.onImageChange = this.onImageChange.bind(this);
//   }

//   onImageChange = e => {
//     //lets check our mongo schema and start fresh with no data and add a product.
//     const file = (e.target).files[0]
//     if (file){
//     const reader = new FileReader();
//     reader.readAsDataURL(file)
//     reader.onload = (e) => {
//       var img = new Image();
//       img.src = e.target.result;
//       img.onload = ()=> {
//         var ob = { "64bit": reader.result,  "image_structure": { "width": img.width, "height": img.height, "filename": file.name, "filesize": file.size, "filetype": file.type } }
//         //  this.setState({image:ob});
//          this.props.update(ob)
//        }

//      }
//    }
//    };


//    render(){

//     return (
//     <div>
//       <img alt={this.props.image.filename} style={{width:"50px", height:"50px"}} src={this.props.image['64bit']} />
//       <input type="file" name="myImage" onChange={this.onImageChange} />
//     </div>
//     )
//    }



// }
// export default ImageInput
