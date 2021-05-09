from TSTNode import Node

# The TST class below defines a Ternary Search Tree
# with the following methods:
# add, delete, search, autocomplete, getAllKeys

class TST:
    def __init__(self):
        self.root = Node()

    # Adds key to trie
    def add(self, key, node=None, idx=None):
        if idx is None:
            self.root = self.add(key, self.root, 0)
        else:
            val = key[idx]
            if node is None:
                node = Node()
                node.val = val
            
            if val < str(node.val): node.left = self.add(key, node.left, idx)
            elif val > str(node.val): node.right = self.add(key, node.right, idx)
            elif idx < len(key) - 1: node.mid = self.add(key, node.mid, idx + 1)
            else: node.lastKey = True

            return node

    # Determines whether key is in tree
    def search(self, key):
        return self._get(key) != None

    # Searches tree and returns last node
    def _get(self, key, node=None, idx=None):
        if idx is None:
            node = self._get(key, self.root, 0)
            if node is None: return None
            return node
        else:
            if node is None: return None
            val = key[idx]

            if val < str(node.val): return self._get(key, node.left, idx)
            elif val > str(node.val): return self._get(key, node.right, idx)
            elif idx < len(key) - 1: return self._get(key, node.mid, idx + 1)
            else: return node

    # Deletes key from tree
    def delete(self, key, node=None):
        if node is None:
            deleted = self.delete(key, self.root)
            return deleted
        else:
            char = key[0]
            if char == str(node.val):
                if len(key) == 1:
                    if node.lastKey:
                        node.lastKey = False
                        node.val = None
                        return True
                    else: return False
                elif node.mid is None: return False
                else: return self.delete(key[1:], node.mid)

            elif char < str(node.val):
                if node.left is None: return False
                else: return self.delete(key, node.left)
            elif char > str(node.val):
                if node.right is None: return False
                else: return self.delete(key, node.right)

    # Returns list of possible words in trie based on key prefix
    def autocomplete(self, key):
        node = self._get(key)
        if node is None:
            return None
        else:
            tempList = list(map(lambda x : key[0:len(key) - 1] + x, self.getKeys(node)))
            removalList = []
            for i in tempList:
                if i[0:len(key)] != key:
                    removalList.append(i)
            for i in removalList:
                tempList.remove(i)
            return tempList

    # Returns list of keys inserted into trie
    def getKeys(self, node=None, currPath=None, keys=None):
        if keys is None:
            keys = []
            if node is None: self.getKeys(self.root, "", keys)
            else:
                self.getKeys(node, "", keys)
            return keys
        else:
            if node.lastKey:
                keys.append(currPath + node.val)

            if node.left is not None: 
                self.getKeys(node.left, currPath, keys)

            if node.right is not None:
                self.getKeys(node.right, currPath, keys)

            if node.mid is not None:  
                self.getKeys(node.mid, currPath + node.val, keys)