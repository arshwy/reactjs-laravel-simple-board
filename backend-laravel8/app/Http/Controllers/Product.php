<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

use App\Models\Product as ProductModel;
use App\Models\User;

class Product extends Controller
{

    public function storeProduct(Request $request){
      $validator = Validator::make($request->all(), [
        'name'  => 'required|max:100',
        'image' => 'required',
        'description' => 'required|max:500',
        'price' => 'required',
      ]);
      if ($validator->fails()) {
        return response()->json(
          ['errors'=>$validator->errors()],  422
        );
      }
      $product = new ProductModel;
      $extension = $request->image->extension();
      $path = $request->image->storeAs('products', time().".".$extension);
      $product->file_path = $path;
      $product->name = $request->name;
      $product->description = $request->description;
      $product->price = $request->price;
      $product->save();
      return $product;
    }


    public function getAll(){
      $products = ProductModel::orderBy('id', 'desc')->get();
      return response()->json([
        'products' => $products,
        'message'  => 'success',
        'status'   => true,
      ]);
    }

    public function paginateAll(Request $request){
      $products = ProductModel::query()->orderBy('id', 'desc')->paginate($request->productsPerPage);
      return response()->json([
        'products' => $products,
        'message'  => 'success',
        'status'   => true,
      ]);
    }


    public function getProductById(Request $request){
      $product = ProductModel::find($request->product_id);
      if($product) {
        return response()->json([
          'product' => $product,
          'message' => 'success',
          'status'  => true,
        ]);
      }
      else {
        return response()->json([
          'product' => null,
          'message' => 'Product not found!',
          'status'  => false,
        ], 422);
      }
    }

    public function deleteById(Request $request){
      // return $request->product_id;
      $product1 = $product = ProductModel::find($request->product_id);
      $product->delete();
      return $product1;
    }

    public function update(Request $request){
      $validator = Validator::make($request->all(), [
        'name'  => 'required|max:100',
        'image' => 'nullable',
        'description' => 'required|max:500',
        'price' => 'required',
      ]);
      if ($validator->fails()) {
        return response()->json(
          ['errors' => $validator->errors()],  422
        );
      }
      $product = ProductModel::find($request->product_id);
      if ($request->hasFile('image')) {
        $extension = $request->image->extension();
        $path = $request->image->storeAs('products', time().".".$extension);
        $product->file_path = $path;
      }
      $product->name = $request->name;
      $product->description = $request->description;
      $product->price = $request->price;
      $product->save();
      return $product;
    }



    public function search(Request $request){
      // return "search";
      $keyword = $request->keyword;
      return  ProductModel::where('name', 'like', "%$keyword%")
                  ->orWhere('description', 'like', "%$keyword%")
                  ->orWhere('price', 'like', "%$keyword%")
                  ->orWhere('id', 'like', "%$keyword%")
                  ->get();
    }



}
