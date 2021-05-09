from TernarySearchTree import TST
import pickle
# driver code

searchTree = TST()
searchTree.add("hello")
searchTree.add("goodbye")
searchTree.add("horses")
searchTree.add("hellish")
searchTree.add("testing")


print(searchTree.delete("hllo"))
print(searchTree.getKeys())