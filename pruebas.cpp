#include <bits/stdc++.h>
using namespace std;

int main(){

  string s = "abcde";
  int i = 0;
  do{
    if(i > 100) cout << i << " ";
    else if(i >= 10)  cout << i << "  ";
    else        cout << i << "   ";
    ++i;
    cout << s << endl;
  }while(next_permutation(s.begin(), s.end()));

  return 0;
}


/* a b [c] d e 67
a b d [e] 19
[a] b d 1
b [d] 1
[b] 0

67th permutacion = ceadb ceadb */