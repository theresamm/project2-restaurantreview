<h2>PROJECT NAME AND SUMMARY</h2>

<h2>Restaurant Reviews</h2>

<p>The restaurant reviews API provides information and clients' reviews of the different restaurants in Metro Manila and nearby provinces. It aims to assist the users to quickly generate the relevant information on a specific restaurant of their choice or filter it out by categories.</p>

Here is the deployed link website: <a href ="https://github.com/theresamm/project2-restaurantreview">link</a>

<h2>FEATURES</h2>
<li>The main features of the restaurant review API include the lists of different restaurants which enables the users to search the details by categories. This also could provide the relevant information related to the restaurants.  </li>

<h2>SAMPLE MONGO DOCUMENT</h2>

<li>Screenshot of Mongo Document Collection</li>

<img src=images/mongo.JPG>

<h2>API DOCUMENTATION</h2>

| Title                 		| Create a new restaurant review					            |
| Method           		| POST									            |
| Endpoint Path               | /restaurantreviews							            |
| Body		               |   {									            |
|			 |	"name":"Joyful Dining Restaurant",				            |
|			 |	"cuisine":"Filipino",						            |
|			 |	"location":"Makati City",					            |
|			 |	"bestseller":["Sinigang", "Kare-Kare", "Crispy Pata", "Pancit Canton"],    |  |			 |	"meals":["All-day breakfast", "Lunch", "Dinner", "Merienda"],	            |
|			 |	"average_cost":800.00,						            |
|			 |	"store_hours":{							            |
|			 |	 	"open":"10:00AM",					            |
|			 |		"close":"9:00PM",					            |
|			 |		"available_days":"daily"},				            |
|			 |	"dining":{"seating":["indoor", "outdoor"],			            |
|			 |		    "smoke":["smoking", "non-smoking"]},		            |
|			 |	"features":["Wifi", "Takeout", "Home Delivery", "Parking",],	            |
|			 |	"contact":["Phone", "E-mail", "Website"],			            |
|			 |	"rating":9							            |
|			 |   }									            |
| Parameters                     | <li>name (string) : Name of the restaurant</li>			            |
|	                              | <li>cuisine (string) : Type of cuisine</li>				            |
|	                              | <li>location (string) : Location of restaurant</li>			            |
|	                              | <li>bestseller (array of strings) : List of bestseller food in the restaurant</li>   |	 |	                              | <li>meals (array of strings) : Meal time</li>			          	            |
|	                              | <li>average_cost (integer) : Average amount spent per person</li>	            |
|	                              | <li>store_hours (object) : Time during which the restaurant is open</li>          |
|	                              | <li>dining (object) : Seating and smoking or non-smoking preferences</li>      |
|	                              | <li>features (array of strings) : List of amenities and services available.</li>    |
|	                              | <li>contact(array of strings) : List of contact details</li>  		            |
|	                              | <li>rating(integer) : Rating of the restaurant</li>	  		            |
| Expected Response       |   {									            |
|			 |  “status”:200								            |
|			 |   }									            |


| Title                 		| Create a new comment						            |
| Method           		| POST									            |
| Endpoint Path               | /restaurantreviews/<reviewId>/comments				            |
| Body		               |   {									            |
|			 |	"reviewer_name":"Anna",					            |
|			 |	"comment":"The food was amazing! Excellent service!",		            |
|			 |	"date_of_visit":"January 2021",					            |
|			 |	"score":9	    						            |
|			 |   }									            |
| Parameters                     | <li> reviewer_name (string) : Name of the reviewer</li>		            |
|	                              | <li> comment (string) : Details of the review</li>			            |
|	                              | <li> date_of_visit(string) : The date the reviewer visited the restaurant</li>    |
|	                              | <li> score (integer) : Rating provided by the reviewer</li>		            |
| Expected Response       |   {									            |
|			 |  “status”:200								            |
|			 |   }									            |


| Title                 		| Retrieve the list of restaurants						            |
| Method           		| GET									            |
| Endpoint Path               | /restaurantreviews							            |
| Body		               | N/A									            |
| Parameters	               | N/A									            |
| Expected Response      |  [									            |
|		               |       {									            |
|			 |	"_id":"<reviewId>",						            |
|			 |	"name":"Joyful Dining Restaurant",				            |
|			 |	"cuisine":"Filipino",						            |
|			 |	"location":"Makati City",					            |
|			 |	"bestseller":["Sinigang", "Kare-Kare", "Crispy Pata", "Pancit Canton"],    |  |			 |	"meals":["All-day breakfast", "Lunch", "Dinner", "Merienda"],	            |
|			 |	"average_cost":800.00,						            |
|			 |	"store_hours":{							            |
|			 |	 	"open":"10:00AM",					            |
|			 |		"close":"9:00PM",					            |
|			 |		"available_days":"daily"},				            |
|			 |	"dining":{"seating":["indoor", "outdoor"],			            |
|			 |		    "smoke":["smoking", "non-smoking"]},		            |
|			 |	"features":["Wifi", "Takeout", "Home Delivery", "Parking",],	            |
|			 |	"contact":["Phone", "E-mail", "Website"],			            |
|			 |	"rating":9							            |
|			 |       },									            |
|			 |  ]									            |



| Title                 		| Retrieve the details in the comments					            |
| Method           		| GET									            |
| Endpoint Path               | /restaurantreviews/<reviewId>					            |
| Body		               | N/A									            |
| Parameters	               | <li>reviewId: Unique id of a restaurant.				            |
| Expected Response      |   {									            |
|			 |	"_id":"<commentId>",						            |
|			 |	"reviewer_name":"Anna",					            |
|			 |	"comment":"The food was amazing! Excellent service!",		            |
|			 |	"date_of_visit":"January 2021",					            |
|			 |	"score":9	    						            |
|			 |   }									            |


| Title                 		| Update the details in the restaurant review				            |
| Method           		| PUT									            |
| Endpoint Path               | /restaurantreviews/<reviewId>		  			            |
| Body		               |   {									            |
|			 |	"name":"Joyfully Dining Restaurant",				            |
|			 |   }									            |
| Parameters                     | <li>name (string) : Name of the restaurant</li>			            |
| Expected Response       |   {									            |
|			 |  “status”:200								            |
|			 |   }									            |


| Title                 		| Update the details in the comments					            |
| Method           		| PUT									            |
| Endpoint Path               | /comments/<commentId>		  				            |
| Body		               |   {									            |
|			 |	"reviewer_name":"Anna",					            |
|			 |   }									            |
| Parameters                     | <li> reviewer_name (string) : Name of the reviewer</li>		            |
| Expected Response       |   {									            |
|			 |  “status”:200								            |
|			 |   }									            |



| Title                 		| Delete a restaurant review						            |
| Method           		| DELETE								            |
| Endpoint Path               | /restaurantreviews/<reviewId>		  			            |
| Body		               | N/A									            |
| Parameters                     | N/A									            |
| Expected Response       |   {									            |
|			 |  “status”:200								            |
|			 |   }									            |


| Title                 		| Delete a comment							            |
| Method           		| DELETE								            |
| Endpoint Path               | /comments/<commentId>		  				            |
| Body		               | N/A									            |
| Parameters                     | N/A									            |
| Expected Response       |   {									            |
|			 |  “status”:200								            |
|			 |   }									            |


<h2>TESTING</h2>

| Method           		| POST									            |
| Endpoint Path               | /restaurantreviews							            |
| Body		               |   {									            |
|			 |	"name":"Sample Restaurant",				  	            |
|			 |	"cuisine":"Buffet",						            |
|			 |	"location":"Manila City",					            |
|			 |	"bestseller":["Steak", "Paella", ],    				            |  |			 |	"meals":["Lunch", "Dinner],					            |
|			 |	"average_cost":1800.00,					            |
|			 |	"store_hours":{							            |
|			 |	 	"open":"11:00AM",					            |
|			 |		"close":"11:00PM",					            |
|			 |		"available_days":"Daily"},				            |
|			 |	"dining":{"seating":["Indoor"]		,			            |
|			 |		    "smoke":["Smoking", "Non-smoking"]},		            |
|			 |	"features":["Wifi",  "Parking",],					            |
|			 |	"contact":["Phone", "E-mail", "Website"],			            |
|			 |	"rating":7							            |
|			 |   }									            |
| Expected Response       |   {									            |
|			 |  “status”:200								            |
|			 |   }									            |


| Method           		| POST									            |
| Endpoint Path               | /restaurantreviews/<reviewId>/comments				            |
| Body		               |   {									            |
|			 |	"reviewer_name":"Client_08",					            |
|			 |	"comment":"The food was amazing! Excellent service!",		            |
|			 |	"date_of_visit":"January 2022",					            |
|			 |	"score":7	    						            |
|			 |   }									            |
| Expected Response       |   {									            |
|			 |  “status”:200								            |
|			 |   }									            |


| Method           		| GET									            |
| Endpoint Path               | /restaurantreviews							            |
| Body		               | N/A									            |
| Expected Response      |  [									            |
|		               |       {									            |
|			 |	"_id":"<reviewId>",						            |
|			 |	"name":"Sample Restaurant",				  	            |
|			 |	"cuisine":"Buffet",						            |
|			 |	"location":"Manila City",					            |
|			 |	"bestseller":["Steak", "Paella", ],    				            |  |			 |	"meals":["Lunch", "Dinner],					            |
|			 |	"average_cost":1800.00,					            |
|			 |	"store_hours":{							            |
|			 |	 	"open":"11:00AM",					            |
|			 |		"close":"11:00PM",					            |
|			 |		"available_days":"Daily"},				            |
|			 |	"dining":{"seating":["Indoor"]		,			            |
|			 |		    "smoke":["Smoking", "Non-smoking"]},		            |
|			 |	"features":["Wifi",  "Parking",],					            |
|			 |	"contact":["Phone", "E-mail", "Website"],			            |
|			 |	"rating":7							            |
|			 |       },									            |
|			 |  ]									            |


| Method           		| GET									            |
| Endpoint Path               | /restaurantreviews/123b5b3ac58fda96177123bf			            |
| Body		               | N/A									            |
| Expected Response      |   {									            |
|			 |	"_id":"<commentId>",						            |
|			 |	"reviewer_name":"Client_08",					            |
|			 |	"comment":"The food was amazing! Excellent service!",		            |
|			 |	"date_of_visit":"January 2022",					            |
|			 |	"score":7	    						            |
|			 |   }									            |


| Method           		| PUT									            |
| Endpoint Path               | /restaurantreviews/630b5b3ac58fda96177354bf			            |
| Body		               |   {									            |
|			 |	"name":"Global Restaurant",					            |
|			 |   }									            |
| Expected Response       |   {									            |
|			 |  “status”:200								            |
|			 |   }									            |


| Method           		| PUT									            |
| Endpoint Path               | /comments/630e173271f156991a1fedef				            |
| Body		               |   {									            |
|			 |	"reviewer_name":"Tin",						            |
|			 |   }									            |
| Expected Response       |   {									            |
|			 |  “status”:200								            |
|			 |   }									            |

| Method           		| DELETE								            |
| Endpoint Path               | /restaurantreviews/123b5b3ac58fda96177123bf			            |
| Body		               | N/A									            |
| Expected Response       |   {									            |
|			 |  “status”:200								            |
|			 |   }									            |


| Method           		| DELETE								            |
| Endpoint Path               | /comments/456b5b3ac58fda96177456ab				            |
| Body		               | N/A									            |
| Expected Response       |   {									            |
|			 |  “status”:200								            |
|			 |   }									            |


<h3>Credits and Acknowledgement</h3>
<li>MongoDB - https://cloud.mongodb.com</li>
<li>Advanced Rest Client by MuleSoft </li>

<li>Consultations:
I would like to express my gratitude to all the teachers who guided me and provided advice in completing the project.</li>
