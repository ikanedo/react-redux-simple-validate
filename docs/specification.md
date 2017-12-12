1.  **On Render**
    2.  WHEN child is a form element (inputs, textarea or select) THEN attach validation event handlers
    3.  WHEN **defaultValues/defaultErrors** is provided THEN hydrate the forms with the given seed data
    4.  WHEN child is a **FormError** component THEN add the error message if available
    5.  Filters all validation rules that does not match a child form element (input, select, textarea)
2.  **Form Element - onBlur**
	1. 	WHEN the form element is blurred w/o data change THEN do nothing
    2.  WHEN the form element is **invalid** on blur THEN add error classes and error message.
    3.  WHEN the form element is **valid** on blur THEN remove error classes and error message.
2.  **Form Element - onChange**
    1.  WHEN the form element is **valid** on change THEN remove error classes and error message.
3.  **triggerValidate**
    1.  WHEN **triggerValidate** action is called THEN add error classes and error messages to the **invalid** form elements.
    2.  WHEN **triggerValidate** action is called THEN remove error classes and error messages to the **valid** form elements.
    3.  WHEN **triggerValidate** action is called AND it passes the validation rules THEN execute the given **handleValidForm** callback
    4.  WHEN **triggerValidate** action is called AND it does not pass the validation rules THEN execute the given **handleInvalidForm** callback