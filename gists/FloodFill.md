[LeetCode 733. Flood Fill](https://leetcode.com/problems/flood-fill/).

An image is represented by a 2-D array of integers, each integer representing the pixel value of the image (from 0 to 65535).

Given a coordinate (sr, sc) representing the starting pixel (row and column) of the flood fill, and a pixel value newColor, "flood fill" the image.

To perform a "flood fill", consider the starting pixel, plus any pixels connected 4-directionally to the starting pixel of the same color as the starting pixel, plus any pixels connected 4-directionally to those pixels (also with the same color as the starting pixel), and so on. Replace the color of all of the aforementioned pixels with the newColor.

At the end, return the modified image.

#### Example 1:
```
Input:
image = [[1,1,1],[1,1,0],[1,0,1]]
sr = 1, sc = 1, newColor = 2
Output: [[2,2,2],[2,2,0],[2,0,1]]
Explanation:
From the center of the image (with position (sr, sc) = (1, 1)), all pixels connected
by a path of the same color as the starting pixel are colored with the new color.
Note the bottom corner is not colored 2, because it is not 4-directionally connected
to the starting pixel.
```
#### Notes
* The length of image and image[0] will be in the range [1, 50].
* The given starting pixel will satisfy 0 <= sr < image.length and 0 <= sc < image[0].length.
* The value of each color in image[i][j] and newColor will be an integer in [0, 65535].

#### Hints
* Write a recursive function that paints the pixel if it's the correct color, then recurses on neighboring pixels.

## Solution

#### Approach: Depth First Search
<strong>Intuition</strong>

We perform the algorithm explained in the problem description: paint the starting pixels, plus adjacent pixels of the same color, and so on.

<strong>Algorithm</strong>

Say color is the color of the starting pixel. Let's floodfill the starting pixel: we change the color of that pixel to the new color, then check the 4 neighboring pixels to make sure they are valid pixels of the same color, and of the valid ones, we floodfill those, and so on.

We can use a function dfs to perform a floodfill on a target pixel.

#### My solution:
```
const fill = (image,i,j,color,newColor) => {
    //check bounds, i = top & bottom, j = left and right
    if (i < 0 || i >= image.length || j < 0 || j >= image[i].length || image[i][j] !== color) {
        return
    }
    // is new pixel = newColor ? else return
    image[i][j] = newColor
    fill(image,i+1,j,color,newColor)
    fill(image,i-1,j,color,newColor)
    fill(image,i,j+1,color,newColor)
    fill(image,i,j-1,color,newColor)

}
// dfs graph problem
var floodFill = function(image, sr, sc, newColor) {
    if (image[sr][sc] === newColor) return image

    fill(image,sr,sc,image[sr][sc],newColor)

    return image
};
```

#### Complexity Analysis

* Time Complexity: O(N), where N is the number of pixels in the image. We might process every pixel.

* Space Complexity: O(N), the size of the implicit call stack when calling dfs.

