<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

use App\Http\Controllers\User as UserController;
use App\Http\Controllers\Product as ProductController;

// public routes
Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);



// protected routes
Route::middleware(['auth:sanctum'])->group( function(){
  Route::post('/logout', [UserController::class, 'logout']);
  Route::post('/add_product', [ProductController::class, 'storeProduct']);
  Route::post('/get_all_products', [ProductController::class, 'getAll']);
  Route::get('/paginate_all_products/{productsPerPage}', [ProductController::class, 'paginateAll']);
  Route::post('/get_product_by_id', [ProductController::class, 'getProductById']);
  Route::post('/delete_product', [ProductController::class, 'deleteById']);
  Route::post('/update_product', [ProductController::class, 'update']);
  Route::get('/search_products/{keyword}', [ProductController::class, 'search']);
});




//
