# The Node class below defines a single node for the 
# Ternary Search Tree implemented in TernarySearchTree.py

class Node:
    def __init__(self, val=None, lastKey=False):
        self.val = val
        self.lastKey = lastKey
        self.right = None
        self.mid = None
        self.left = None