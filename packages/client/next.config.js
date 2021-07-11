// eslint-disable-next-line @typescript-eslint/no-var-requires
const withImages = require("next-images");

module.exports = {
    async rewrites() {
        return [
            {
                source: "/api/:slug*",
                destination: "http://localhost:5000/api/:slug*",
            },
        ];
    },
    loaders: [
        {
            test: /\.(gif|svg|jpg|png)$/,
            loader: "file-loader",
        },
    ],
    ...withImages(),
};
