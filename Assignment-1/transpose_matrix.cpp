//4.Write a program to implement matrix transpose.


#include <iostream>

using namespace std;

void transposeMatrix(int matrix[][10], int transposed[][10], int rows, int cols) {
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            transposed[j][i] = matrix[i][j];
        }
    }
}

void printMatrix(int matrix[][10], int rows, int cols) {
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            cout << matrix[i][j] << " ";
        }
        cout << endl;
    }
}

int main() {
    int rows, cols;
    cout << "Enter number of rows and columns: ";
    cin >> rows >> cols;

    int matrix[10][10], transposed[10][10];

    cout << "Enter matrix elements:\n";
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            cin >> matrix[i][j];
        }
    }

    transposeMatrix(matrix, transposed, rows, cols);

    cout << "\nOriginal Matrix:\n";
    printMatrix(matrix, rows, cols);

    cout << "\nTransposed Matrix:\n";
    printMatrix(transposed, cols, rows);

    return 0;
}
