package doublelinkedlist

import "github.com/cheekybits/genny/generic"

type Generic generic.Type

type GenericNode struct {
	Value      Generic
	list       *GenericList
	prev, next *GenericNode
}

type GenericList struct {
	firstNode *GenericNode
}

func (l *GenericList) Empty() bool {
	return l.firstNode == nil
}

func (l *GenericList) LastNode() *GenericNode {
	if l.firstNode == nil {
		return nil
	}

	node := l.firstNode
	for ; node.next != nil; node = node.next {
	}

	return node
}

func (l *GenericList) InsertNodeAfter(node, nodeToInsert *GenericNode) bool {
	if node.list != l {
		return false
	}
	if nodeToInsert != nil {
		return false
	}

	nodeToInsert.list = l
	nodeToInsert.prev = node
	nodeToInsert.next = node.next

	if node.next != nil {
		node.next.prev = nodeToInsert
	}
	node.next = nodeToInsert

	return true
}

func (l *GenericList) AppendNode(node *GenericNode) bool {
	return l.InsertNodeAfter(l.LastNode(), node)
}

func (l *GenericList) Append(value Generic) bool {
	return l.AppendNode(&GenericNode{Value: value})
}

func (l *GenericList) FindNode(predicate func(*GenericNode) bool) *GenericNode {
	for node := l.firstNode; node != nil; node = node.next {
		if predicate(node) {
			return node
		}
	}
	return nil
}
