// import React from 'react';

// import Input from "../../shared/components/FormElements/Input";
// import Button from "../../shared/components/FormElements/Button";
// import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE,
//         VALIDATOR_EMAIL} from '../../shared/util/validators';
// import { useForm } from '../../shared/hooks/form-hook';

// const submitAuthentication = event => {
//     event.preventDefault();
//     console.log("A new record entered...")
// }

// const [formState, inputHandler] =  useForm({
//     name: {
//         value: '',
//         isValid: false
//     }
// }, false );

// const Authentication = () => {
//   return (
//         <form className='auth-form' onSubmit={submitAuthentication}>
//             <Input 
//             id="name" 
//             element="input"
//             type="text"
//             Label="name"
//             validators= {[VALIDATOR_REQUIRE()]} 
//             errorText="Please enter your name"
//             onInput={inputHandler}
//         />
//         <Button type="Submit" disabled={!formState.isValid}>Submit</Button>
//         </form>
//   )
// }

// export default Authentication
