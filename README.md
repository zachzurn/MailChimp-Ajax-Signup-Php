# PhpMailchimpAjaxSignup

Simple signup Jquery plugin with PHP Script for Mailchimp v3 API.

Mailchimp Submission Plugin by Zach Zurn.

## Example bare minimum form:

Include the script and jQuery on your page and create a form as shown below. No additional Javascript is needed.

    <form action="/assets/mailchimp/" novalidate data-mailchimp="LIST-ID-GOES-HERE" data-redirect="URL-TO-REDIRECT-ON-SUCCESS">
        <input type="text" placeholder="Name" id="name" name="name" required data-validation-required-message="Please enter your name" />
        <input type="email" placeholder="Email Address" id="email" name="email" email data-validation-email-message="Please enter a valid email address" required data-validation-required-message="Please enter your email address" />
    </form>

The 'data-mailchimp' attribute tells the plugin to use this form for mailchimp submissions and should have the list id as it's attribute.

The 'action' attribute must point to the mailchimp php file which has the apiKey.

Forms must have a field named "email" and either a field named "name" or fields named "first_name" and "last_name".
These are the required fields for mailchimp. Any additional fields will be added to the MailChimp merge_fields.


## Example checkbox for subscribing to interest group shown below.

In this example 'da3efd8270' is the interest id.

    <input type="checkbox" name="interest-da3efd8270" id="interest-da3efd8270"><label for="interest-da3efd8270"> Host</label>

## Example input for custom merge_field.

    <input type="text" placeholder="Describe Yourself" id="MMERGE10" name="MMERGE10" />

## Basic Validation

Supported Validation is 'required' and 'email' at the moment.

'required' attribute needs to also have a 'data-validation-required-message' attribute.
'email' attribute needs to also have a 'data-validation-email-message' attribute.
