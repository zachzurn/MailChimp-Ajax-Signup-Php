$(document).ready(function(){

    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    function validateField(element,name,value){

        var required = element.attr('required');
        var email = element.attr('email');

        if(typeof required !== typeof undefined && required !== false){

            if(value.length == 0){
                element.addClass('error');
                element.after('<span class="field-error">' + element.attr('data-validation-required-message') + '</span>')

                return false;
            }

        }

        if(typeof email !== typeof undefined && email !== false){

            if(!re.test(value)){
                valid = false;

                element.addClass('error');
                element.after('<span class="field-error">' + element.attr('data-validation-email-message') + '</span>')

                return false;
            }

        }

        return true;

    }

    $('form[data-mailchimp]').each(function(){

        var form = $(this);
        var list = form.attr('data-mailchimp');
        var url = form.attr('action');
        var redirect = form.attr('data-redirect');

        function success(){
            if(typeof redirect !== typeof undefined && redirect !== false){

                window.location = redirect;

            }
        }


        if(!list) return;

        form.submit(function(e) {

            e.preventDefault();

            //Reset errors and such
            form.removeClass('loading');
            form.find('.field-error').remove();
            form.find('.form-error').html('');

            var fields = form.serializeArray();


            var data = {
                list : list,
                email : "",
                first_name : "",
                last_name : "",
                timestamp_signup : (new Date).getTime(),
                merge_fields : {},
                interests : {}
            }


            //Validate all of the fields
            for(var i = 0; i < fields.length; i++){
                var field = fields[i];
                if(!validateField(form.find('[name='+field.name+']'),field.name,field.value)) return;

                if(field.name.indexOf('email') > -1){
                    data.email = field.value;
                }
                else if(field.name == 'name'){
                    var nameArray = field.value.split(' ');
                    data.first_name = nameArray[0];
                    data.last_name = nameArray.length > 1 ? nameArray[1] : "";
                }
                else if(field.name == 'first_name'){
                    data.first_name = field.value;
                }
                else if(field.name == 'last_name'){
                    data.last_name = field.value;
                }
                else if(field.name.indexOf('interest') > -1){
                    var fdata = field.name.split('-');
                    var el = form.find('input[name='+field.name+']');
                    data.interests[fdata[1]] = el.prop('checked');
                }
                else{
                    data.merge_fields[field.name] = field.value;
                }

            }


            //All good
            form.addClass('loading');

            if(data.email == ""){

                form.find('.form-error').html('Please provide a valid email address.');

                return;
            }

            $.post(url, data, function(response) {

                    data = jQuery.parseJSON(response);

                    form.removeClass('loading');


                    //Member already exists
                    if(data.status != null && data.status == 400 && data.title == "Member Exists"){
                        form.addClass('success');
                        success();
                        console.log('member exists already');
                    }
                    else if(data.id && data.id.length > 0){
                        form.addClass('success');
                        success();
                        console.log('member added');
                    }
                    else{
                        form.find('.form-error').html('There was an error submitting the form.');
                    }

            });


        });


    });




});
