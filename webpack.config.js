var path = require ('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
require('babel-polyfill')
module.exports = {
    entry:['babel-polyfill','./src/entry.js'],
    output:{
        path:path.resolve(__dirname,'app'),
        filename:'[name].js'
    },
    module:{
        rules:[
            {
				test:/\.jsx?$/,     //这里是一个Rule，"？":前边字符为任意字符，
				exclude:/node_modules/,
                use:['babel-loader']
			},
			{
				test:/\.css$/,
				exclude:/node_modules/,
				loader:'style-loader!css-loader'
			},
			{
				test:/\.(jpg|png|gif|svg)$/,
				loader:'url-loader',
				query:{
					limit:8192,	//超过8192字节使用base64编码发送
					name:'res/img/[name].[ext]'
				}
			},
        ],
	},
	devServer: {
		contentBase:'./app',
		hot: true,
		open:true,
		publicPath:'/'
	},
	// resolve: {
	// 	alias: { 'react/lib/ReactPerf': 'react-dom/lib/ReactPerf' }
	//   },	
    plugins:[
		new HtmlWebpackPlugin({
			template:__dirname+"/src/index.html",
            filename:'index.html'
		}),
		new webpack.HotModuleReplacementPlugin(),
    ],

}
