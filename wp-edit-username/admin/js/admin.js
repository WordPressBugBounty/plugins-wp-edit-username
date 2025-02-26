jQuery( document ).ready( function( $ )
{
	var $container 					= $( ".user-user-login-wrap" );

	var $input  					= $container.find( 'input#user_login' );

	var $update_user_name_tigger 	= $( "#update_user_name_tigger" );

	var $wpeu_new_username 			= $( "#wpeu_new_username" );
	
	var $wp_edit_username_nonce 	= $( "#wp_edit_username_nonce" );
	
	var $wpeu_message 				= $( "#wpeu_message" );

	$container.find( '.description' ).remove();
	
	$input.after( '<button class="button" type="button" id="edit_username_modal_btn" data-bs-toggle="modal" data-bs-target="#edit_username_modal">Edit</button>' );

	$( document ).on( 'click', "#edit_username_modal_btn", function( e )
	{	
		e.preventDefault();
	} );

	$( "#cancel_button" ).click( function( event )
	{	
		$wpeu_new_username.val( '' );
		
		$wpeu_message.empty().hide();
	} );

	$wpeu_new_username.keyup( function( event )
	{	
		if ( $( this ).val() === '' )
		{	
			$update_user_name_tigger.prop( 'disabled', 'disabled' );
		}
		else
		{
			$update_user_name_tigger.removeAttr( 'disabled' );
		}
	} );

	$( document ).on( 'click', "#update_user_name_tigger", function( e )
	{
		if ( ! confirm( WP_Edit_Username.user_edit_txt_i18n ) ) return;
		
		$wpeu_message.empty().hide();
		
		$( "#edit_username_modal .modal-content" ).addClass( 'updating' );

		var data =
		{	
			action 					: 'wpeu_update_user_name',
			
			wp_edit_username_nonce 	: $wp_edit_username_nonce.val(),
			
			current_username 		: $input.val(),
			
			new_username 			: $wpeu_new_username.val()
		};

		$.post( ajaxurl, data ).done( function( msg )
		{	
			$update_user_name_tigger.prop( 'disabled', 'disabled' );
			
			$( "#edit_username_modal .modal-content" ).removeClass( 'updating' );
			
			if ( msg.alert_msg !== undefined )
			{
				$( "#wpeu_message" ).removeClass( 'alert-success' ).addClass( 'alert-danger' ).html( '<span class="dashicons dashicons-no"></span>' + msg.alert_msg ).show();
			}
			else if( msg.success_msg !== undefined )
			{
				$input.val( $wpeu_new_username.val() );
			
				$wpeu_new_username.val('');
			
				$wpeu_message.removeClass( 'alert-danger' ).addClass( 'alert-success' ).html( msg.success_msg ).show();
			}
		} );
	} );
} );